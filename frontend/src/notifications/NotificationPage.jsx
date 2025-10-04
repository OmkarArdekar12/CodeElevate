import React, { useEffect, useState } from "react";
import { getNotifications } from "../service/notificationApi";
import Notification from "./Notification";
import ConnectRequestNotification from "./ConnectRequestNotification";

const NotificationPage = () => {
  const [allNotifications, setAllNotifications] = useState([]);

  const fetchNotifications = async () => {
    const data = await getNotifications();
    console.log(data);
    setAllNotifications(data);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center text-white py-4 px-1 md:px-5 mb-5">
      <div className="flex w-full">
        <h1 className="text-3xl">All Notifications</h1>
      </div>
      <div className="w-full flex flex-col items-center justify-center pt-5 md:px-6">
        {allNotifications.map((notification) =>
          notification.type === "connect" ? (
            <ConnectRequestNotification
              key={notification._id}
              notification={notification}
              fetchNotifications={fetchNotifications}
            />
          ) : (
            <Notification
              key={notification._id}
              notification={notification}
              fetchNotifications={fetchNotifications}
            />
          )
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
