import React from "react";

const NotificationsFeature = () => {
  return (
    <div className="w-full flex flex-col md:flex-row items-center px-4 gap-2 py-10 text-gray-200">
      <div className="flex items-center justify-center w-full md:w-1/2">
        <img
          src="/about/notificationSystem.png"
          alt="Notification Feature Image"
          className="w-full"
        />
      </div>
      <div className="flex flex-col items-center justify-center w-full md:w-1/2 text-md md:text-xl px-2 md:px-14 gap-3">
        <h2 className="text-xl md:text-3xl font-semibold text-center">
          Notification System
        </h2>
        <p>
          The notification system on CodeElevate keeps users informed of
          important social interactions by sending notifications when someone
          follows or unfollows them, likes their posts, or sends a connection
          request. Notifications appear seamlessly, and users can manage them
          easily —by hovering over a notification, a delete button appears,
          allowing users to remove unwanted notifications and keep their
          notification feed organized. This system promotes engagement and
          ensures users never miss key updates within their network.
        </p>
      </div>
    </div>
  );
};

export default NotificationsFeature;
