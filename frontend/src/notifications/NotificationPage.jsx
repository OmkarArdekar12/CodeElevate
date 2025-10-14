import React, { useEffect, useState } from "react";
import { getNotifications } from "../service/notificationApi.js";
import Notification from "./Notification.jsx";
import ConnectRequestNotification from "./ConnectRequestNotification.jsx";
import Loading from "../components/Loading.jsx";

const NotificationPage = () => {
  const [allNotifications, setAllNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const data = await getNotifications();
      setAllNotifications(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-full flex flex-col items-center justify-center text-white py-4 px-2 md:px-10 mb-5 transition-all duration-300 ease-in-out">
      <div className="flex w-full">
        <h1 className="text-3xl hover-text-border text-gray-100">
          All Notifications
        </h1>
      </div>
      <div className="w-full flex flex-col items-center justify-center pt-5 md:px-6">
        {allNotifications && allNotifications.length > 0 ? (
          allNotifications.map((notification) =>
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
          )
        ) : (
          <div className="flex items-center justify-center text-gray-300 pt-5">
            No notifications found
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
