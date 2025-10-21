import React, { useState } from "react";
import { Users } from "lucide-react";

const Sidebar = ({ users, activeUsers, selectedUser, setSelectedUser }) => {
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => activeUsers.includes(user.user._id))
    : users;

  return (
    <aside className="h-full w-20 md:w-50 lg:w-100 border-r border-slate-600 flex flex-col transition-all duration-200 ease-in-out">
      <div className="w-full flex flex-col p-1 md:p-4 items-start justify-center border-b border-slate-600">
        <div className="text-xl md:text-2xl font-semibold flex gap-1 md:gap-2 items-center">
          <Users className="w-6 h-6" />
          <p className="hidden md:inline">Community</p>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <label className="cursor-pointer flex flex-col md:flex-row md:items-center gap-2">
            <input
              type="checkbox"
              id="yellow-checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="appearance-none w-4 h-4 md:w-5 md:h-5 border-2 checked:p-1 border-gray-400 rounded-full checked:bg-green-500 checked:border-gray-900 checked:border-5 transition duration-200 cursor-pointer"
            />
            <span className="text-xs md:text-sm">Show online users</span>
          </label>
          <span className="text-xs md:text-sm text-zinc-500">
            ({Math.max(0, activeUsers.length - 1)} online)
          </span>
        </div>
      </div>

      <div className="overflow-y-auto flex-1 custom-scrollbar">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((u) => {
            const isActive = activeUsers.includes(u.user._id);
            const isSelected = selectedUser?.user._id === u.user._id;
            return (
              <div
                key={u.user._id}
                onClick={() => setSelectedUser(u)}
                className={`px-2 sm:px-4 py-6 flex items-center gap-2 cursor-pointer border-gray-700 hover:bg-gray-800 ${
                  isSelected ? "bg-gray-900" : ""
                }`}
              >
                <div className="flex relative">
                  <img
                    src={u?.profilePicture || "/images/defaultUserImage.png"}
                    alt="profilePicture"
                    className="w-14 h-14 rounded-full"
                  />
                  {isActive && (
                    <span
                      className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                    />
                  )}
                </div>
                <div className="hidden md:flex flex-col justify-center">
                  {u.user.username && (
                    <p className="text-md md:text-lg">{u.user.username}</p>
                  )}
                  <p className="text-xs text-gray-400">
                    {isActive ? "Online" : "Offline"}
                  </p>
                </div>
              </div>
            );
          })
        ) : users.length === 0 ? (
          <div className="pt-10 flex-1 flex items-center justify-center text-gray-400">
            No users found
          </div>
        ) : (
          <div className="pt-10 flex-1 flex items-center justify-center text-gray-400">
            No online users
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
