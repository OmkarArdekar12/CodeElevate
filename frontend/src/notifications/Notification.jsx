import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoNotificationsCircle } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
import { getUserData } from "../service/profileApi";
import { deleteNotification } from "../service/notificationApi";
import toast from "react-hot-toast";

const Notification = ({ notification, fetchNotifications }) => {
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
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSenderData(senderId);
  }, [senderId]);

  const handleDeleteNotification = async () => {
    try {
      const notificationId = notification._id;
      const response = await deleteNotification(notificationId);
      fetchNotifications();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-[#03393f] hover:bg-[#033954] w-[95%] flex flex-col flex-wrap justify-center px-5 py-2 rounded-lg my-2 group">
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
          <span className="text-sm text-gray-900 font-bold group-hover:underline">
            @{senderData.username}
          </span>
        </Link>
        <div className="w-[90%] text-md md:text-xl italic flex items-center pl-2 md:pl-5 mr-2 group-hover:not-italic">
          {msg}
        </div>
        <button
          onClick={handleDeleteNotification}
          className="hidden text-2xl text-red-600 cursor-pointer ml-auto group-hover:block"
        >
          <MdDeleteForever />
        </button>
      </div>
      <div className="italic font-medium text-black ml-auto text-xs">
        {formattedTime}
      </div>
    </div>
  );
};

export default Notification;
