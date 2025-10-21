import React, { useState, useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble.jsx";
import MessageInput from "./MessageInput.jsx";
import ChatHeader from "./ChatHeader.jsx";
import ChatSkeleton from "./skeletons/ChatSkeleton.jsx";
import { getMessages, sendMessage } from "../service/messagesApi.js";

export default function ChatWindow({
  user,
  selectedUser,
  setSelectedUser,
  socket,
}) {
  const [loadingChat, setLoadingChat] = useState(true);
  const [messages, setMessages] = useState([]);
  const messagesContainerRef = useRef(null);

  const loggedInUserId = user?.userId;
  const selectedUserId = selectedUser.user._id;
  const roomId = [loggedInUserId, selectedUserId].sort().join("_");

  useEffect(() => {
    if (!socket || !roomId) {
      return;
    }

    if (socket.connected) {
      socket.emit("joinRoom", roomId);
    } else {
      socket.on("connect", () => {
        socket.emit("joinRoom", roomId);
      });
    }

    return () => {
      socket.emit("leaveRoom", roomId);
    };
  }, [socket, roomId]);

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
        if (msg.roomId === roomId && msg.senderId != loggedInUserId) {
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
    const container = messagesContainerRef.current;
    if (!container) {
      return;
    }

    container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const handleSend = async (msgData) => {
    const newMsg = await sendMessage(selectedUserId, msgData);
    setMessages((prev) => [...prev, newMsg]);
  };

  return (
    <div className="overflow-auto flex flex-col flex-1 custom-scrollbar">
      <ChatHeader selectedUser={selectedUser} closeChat={setSelectedUser} />
      {loadingChat ? (
        <ChatSkeleton />
      ) : (
        <div className="flex-1 p-4 overflow-y-auto" ref={messagesContainerRef}>
          {messages.map((msg) => (
            <MessageBubble key={msg._id} user={user} message={msg} />
          ))}
        </div>
      )}
      <MessageInput onSend={handleSend} />
    </div>
  );
}
