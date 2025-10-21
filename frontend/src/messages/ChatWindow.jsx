import React, { useState, useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble.jsx";
import MessageInput from "./MessageInput.jsx";
import { getMessages, sendMessage } from "../service/messagesApi.js";

export default function ChatWindow({ user, selectedUser, socket }) {
  const [loadingChat, setLoadingChat] = useState(true);
  const [messages, setMessages] = useState([]);
  const messagesContainerRef = useRef(null);
  const messagesEndRef = useRef(null);

  const loggedInUserId = user?.userId;
  const selectedUserId = selectedUser.user._id;
  const roomId = [loggedInUserId, selectedUserId].sort().join("_");

  useEffect(() => {
    if (!socket || !roomId) {
      return;
    }

    socket.emit("joinRoom", roomId);
    return () => {
      socket.emit("leaveRoom", roomId);
    };
  }, [socket, roomId, user]);

  const loadMessages = async () => {
    setLoadingChat(true);
    try {
      if (roomId) {
        const msgs = await getMessages(roomId);
        setMessages(msgs);
      }
    } catch (err) {
      setMessages([]);
    } finally {
      setLoadingChat(false);
    }
  };

  useEffect(() => {
    loadMessages();

    if (socket) {
      socket.on("receiveMessage", (msg) => {
        if (msg.roomId === roomId) {
          setMessages((prev) => [...prev, msg]);
        }
      });
    }

    return () => {
      if (socket) {
        socket.off("receiveMessage");
      }
    };
  }, [selectedUser, roomId, socket]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (msgData) => {
    const newMsg = await sendMessage(selectedUserId, msgData);
    setMessages((prev) => [...prev, newMsg]);
  };

  return (
    <div className="md:bg-gray-900 overflow-auto flex flex-col flex-1 custom-scrollbar">
      <div className="p-4 border-b border-cyan-300 flex items-center justify-between">
        <h2 className="font-semibold text-lg">{selectedUser.user.username}</h2>
      </div>
      <div className="flex-1 p-4 overflow-y-auto" rel={messagesContainerRef}>
        {messages.map((msg) => (
          <MessageBubble key={msg._id} message={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <MessageInput onSend={handleSend} />
    </div>
  );
}
