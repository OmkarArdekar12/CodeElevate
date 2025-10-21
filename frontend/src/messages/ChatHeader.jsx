import React from "react";
import { useNavigate } from "react-router-dom";
import { IoIosClose } from "react-icons/io";
import { MdArrowBackIosNew } from "react-icons/md";

const ChatHeader = ({ selectedUser, closeChat }) => {
  const navigate = useNavigate();
  return (
    <div className="px-4 py-7 border-b border-cyan-300 flex items-center justify-between">
      <div
        onClick={() => navigate(`/profiles/${selectedUser.user._id}`)}
        className="flex items-center gap-2 cursor-pointer"
      >
        <img
          src={selectedUser.profilePicture || "/images/defaultUserImage.png"}
          alt="UserProfilePicture"
          className="size-14 rounded-full"
        />
        <div>
          <h2 className="font-semibold text-lg">
            {selectedUser.fullName} .{" "}
            <span className="text-md">@{selectedUser.user.username}</span>
          </h2>
          <h2 className="font-normal text-sm">{selectedUser.headLine}</h2>
        </div>
      </div>
      <div
        onClick={() => closeChat(null)}
        className="flex justify-center items-center cursor-pointer pl-2"
      >
        <IoIosClose className="hidden sm:inline sm:size-12 bg-transparent text-cyan-300 hover:scale-125 transition-all ease-in-out" />
        <MdArrowBackIosNew className="inline sm:hidden size-8 bg-transparent text-cyan-300 hover:scale-125 transition-all ease-in-out" />
      </div>
    </div>
  );
};

export default ChatHeader;
