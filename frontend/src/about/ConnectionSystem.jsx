import React from "react";
import { motion } from "framer-motion";

const ConnectionSystem = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="w-full flex flex-col md:flex-row items-center px-4 gap-2 py-10 text-gray-200 transition-all duration-300 ease-in-out"
    >
      <div className="flex flex-col items-center justify-center w-full md:w-1/2 text-md md:text-xl px-2 md:px-14 gap-3">
        <h2 className="text-xl md:text-3xl font-semibold text-center">
          Connection System
        </h2>
        <p>
          The connection feature on CodeElevate allows users to follow or
          unfollow others, adding them to their followers and following lists
          respectively, while connection requests enable users to establish
          mutual connections once accepted, with both users then appearing in
          each other's followers and following lists; a connection list
          specifically shows users who have a mutual following relationship.
          Additionally, users have the ability to send messages directly to
          others via a message button, fostering real-time communication and
          deeper networking within the community.
        </p>
      </div>
      <div className="flex items-center justify-center w-full md:w-1/2">
        <img
          src="/about/connectionProcess.png"
          alt="Connection Process Image"
          className="w-full about-image transition-transform duration-300 ease-in-out hover:scale-105"
        />
      </div>
    </motion.div>
  );
};

export default ConnectionSystem;
