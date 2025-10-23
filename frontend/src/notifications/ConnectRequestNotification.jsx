import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserData } from "../service/profileApi.js";
import { FaRegTimesCircle } from "react-icons/fa";
import { SiTicktick } from "react-icons/si";
import toast from "react-hot-toast";
import { connectResponse } from "../service/connectionApi.js";

const ConnectRequestNotification = ({ notification, fetchNotifications }) => {
  const [senderData, setSenderData] = useState({
    fullName: "",
    username: "",
    headLine: "",
    profilePicture: "",
  });

  const senderId = notification.from;
  const msg = notification.message;
  const time = new Date(notification.createdAt);
  const formattedTime = time.toLocaleString();

  const fetchSenderData = async (id) => {
    if (!id) {
      return;
    }
    try {
      const userData = await getUserData(id);
      setSenderData(userData);
    } catch (err) {
      setSenderData({
        fullName: "",
        username: "",
        headLine: "",
        profilePicture: "",
      });
    }
  };

  useEffect(() => {
    fetchSenderData(senderId);
  }, [senderId]);

  const handleConnection = async (action) => {
    try {
      const notificationId = notification._id;
      const response = await connectResponse(notificationId, action);
      await fetchNotifications();
      toast.success(response?.message, { id: "connection response success" });
    } catch (err) {
      toast.error("Something went wrong!", {
        id: "connection response failed",
      });
    }
  };

  return (
    <div className="bg-[#03393f] hover:bg-[#084c54] w-[95%] flex flex-col flex-wrap justify-center px-5 py-2 rounded-lg my-2 group transition-all duration-300 ease-in-out">
      <div className="w-ful flex">
        <Link
          to={`/profiles/${senderId}`}
          className="flex flex-col justify-center items-center"
        >
          <img
            src={
              senderData.profilePicture
                ? senderData.profilePicture
                : "/images/defaultUserImage.png"
            }
            alt="UserImage"
            className="w-14 h-14 rounded-full"
          />
          <span className="text-sm text-gray-300 font-bold group-hover:underline">
            @{senderData.username}
          </span>
        </Link>
        <div className="w-full text-gray-300 text-md md:text-xl italic flex flex-col justify-center pl-2 md:pl-5 mr-2 group-hover:not-italic">
          <span>{msg}</span>
          <div className="flex flex-wrap items-center not-italic text-sm p-1">
            <button
              onClick={() => handleConnection("accept")}
              className="mt-1 font-semibold flex items-center bg-green-600 hover-text-border hover:bg-green-700 px-4 py-2 rounded-full text-md mr-1 cursor-pointer"
            >
              <SiTicktick className="mr-1 inline w-4 h-4" />
              Accept
            </button>
            <button
              onClick={() => handleConnection("reject")}
              className="mt-1 font-semibold flex items-center bg-teal-700 hover-text-border hover:bg-teal-800 px-4 py-2 rounded-full text-md cursor-pointer"
            >
              <FaRegTimesCircle className="mr-1 inline w-4 h-4" />
              Reject
            </button>
          </div>
        </div>
      </div>
      <div className="italic font-medium text-black ml-auto text-xs">
        {formattedTime}
      </div>
    </div>
  );
};

export default ConnectRequestNotification;
