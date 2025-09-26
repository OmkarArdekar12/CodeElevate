import React from "react";
import { FaUserEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ButtonSection = ({ profileUserId, isLoggedIn, isOwner }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full mt-10 inline-flex flex-wrap items-center justify-center md:justify-start md:pl-25">
        <button className="bg-blue-500 py-2 px-4 m-1 rounded-md hover:text-white hover:border-1 hover-text-border hover:bg-gradient-to-r hover:from-blue-500 hover:via-blue-600 hover:to-blue-700">
          Follow
        </button>
        <button className="bg-blue-500 py-2 px-4 m-1 rounded-md hover:text-white hover:border-1 hover-text-border hover:bg-gradient-to-r hover:from-blue-500 hover:via-blue-600 hover:to-blue-700">
          Following
        </button>
        <button className="bg-blue-500 py-2 px-4 m-1 rounded-md hover:text-white hover:border-1 hover-text-border hover:bg-gradient-to-r hover:from-blue-500 hover:via-blue-600 hover:to-blue-700">
          Connect
        </button>
        <button className="bg-blue-500 py-2 px-4 m-1 rounded-md hover:text-white hover:border-1 hover-text-border hover:bg-gradient-to-r hover:from-blue-500 hover:via-blue-600 hover:to-blue-700">
          Message
        </button>
        {isLoggedIn && isOwner && (
          <div className="ml-auto mr-2 md:mr-10">
            <button
              className="group text-black bg-teal-500 hover:bg-indigo-700 px-8 py-2 text-xl rounded-2xl flex items-center justify-center hover-text-border"
              onClick={() => navigate(`/profiles/${profileUserId}/edit`)}
            >
              <FaUserEdit
                className="inline text-black mr-1 group-hover:text-white"
                size={25}
              />
              Edit
            </button>
          </div>
        )}
      </div>
      <hr className="w-full text-gray-600 mt-25 mb-10" />
    </>
  );
};

export default ButtonSection;
