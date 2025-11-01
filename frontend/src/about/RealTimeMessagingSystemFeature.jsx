import React from "react";
import { motion } from "framer-motion";

const RealTimeMessagingSystemFeature = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="w-full flex flex-col items-center px-4 gap-2 py-10 text-gray-200 transition-all duration-300 ease-in-out"
    >
      <div className="w-full flex flex-col md:flex-row items-center px-4 gap-2 text-gray-200">
        <div className="flex flex-col items-center justify-center w-full md:w-1/2 text-md md:text-xl px-2 md:px-14 gap-3">
          <h2 className="text-xl md:text-3xl font-semibold text-center">
            Real-time Messaging System
          </h2>
          <p>
            The messaging system in CodeElevate is a real-time communication
            platform that allows users to send messages to anyone within the
            community. Users can exchange both text and images seamlessly. The
            system features a filter to show only online users, making it easy
            to identify active contacts. Designed with responsiveness in mind
            and smooth animation, the messaging UI adapts perfectly across all
            screen sizes, ensuring a smooth and accessible user experience on
            desktop and mobile devices alike.
          </p>
        </div>
        <div className="flex items-center justify-center w-full md:w-1/2">
          <img
            src="/about/messagingSystem.png"
            alt="Messaging System Image"
            className="w-full about-image transition-transform duration-300 ease-in-out hover:scale-105"
          />
        </div>
      </div>
      <div className="w-full flex flex-col md:flex-row items-center px-4 gap-2 text-gray-200">
        <div className="flex items-center justify-center w-full md:w-1/2">
          <img
            src="/about/messagingProcess.png"
            alt="Messaging System Process Image"
            className="w-full about-image transition-transform duration-300 ease-in-out hover:scale-105"
          />
        </div>
        <div className="flex items-center justify-center w-full md:w-1/2">
          <img
            src="/about/messagingSystemResponsiveness.png"
            alt="Messaging System Responsiveness Image"
            className="w-full about-image transition-transform duration-300 ease-in-out hover:scale-105"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default RealTimeMessagingSystemFeature;
