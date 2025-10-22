import React, { useState, useEffect, useRef } from "react";
import { useSession } from "../context/SessionContext.jsx";
import { getUserForSidebar } from "../service/messagesApi.js";
import Loading from "../components/Loading.jsx";
import Sidebar from "./Sidebar.jsx";
import SidebarSkeleton from "./skeletons/SidebarSkeleton.jsx";
import NoChatSelected from "./NoChatSelected.jsx";
import ChatWindow from "./ChatWindow.jsx";
import { useLocation } from "react-router-dom";

export default function MessagePage() {
  const { socket, user } = useSession();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeUsers, setActiveUsers] = useState([]);
  const location = useLocation();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const userList = await getUserForSidebar();
      setUsers(userList);
    } catch (err) {
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.on("getActiveUsers", setActiveUsers);
    socket.emit("requestActiveUsers");
    return () => {
      socket.off("getActiveUsers");
    };
  }, [socket]);

  useEffect(() => {
    if (location.state?.toMessage) {
      setSelectedUser(location.state.toMessage);
    }
  }, [location.state]);

  return (
    <div className="w-full flex flex-col items-center justify-center text-white py-4 px-1 md:px-10 mb-5 transition-all duration-300 ease-in-out">
      <div className="w-full flex">
        <h1 className="text-3xl hover-text-border text-gray-100">Messages</h1>
      </div>
      <div className="w-full h-screen mt-4 md:rounded-lg flex border border-slate-800">
        {loading ? (
          <SidebarSkeleton />
        ) : (
          <Sidebar
            users={users}
            activeUsers={activeUsers}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
          />
        )}
        {selectedUser ? (
          <ChatWindow
            user={user}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            socket={socket}
          />
        ) : (
          <NoChatSelected />
        )}
      </div>
    </div>
  );
}
