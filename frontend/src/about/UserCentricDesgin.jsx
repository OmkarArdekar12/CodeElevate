import React from "react";
import { motion } from "framer-motion";

const UserCentricDesgin = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="w-full flex flex-col md:flex-row items-center px-4 gap-2 py-10 text-gray-200 transition-all duration-300 ease-in-out"
    >
      <div className="flex flex-col items-center justify-center w-full md:w-1/2 text-md md:text-xl px-2 md:px-14 gap-3">
        <h2 className="text-xl md:text-3xl font-semibold text-center">
          User Centric UI Design & Multi-functionality
        </h2>
        <p>
          CodeElevate prioritizes accessibility and user-centric design,
          ensuring all features are both visually engaging and easily usable.
          For profile displays, the UI introduces a vibrant touch, when users
          hover over any profile, an animated border appears, providing
          immediate visual feedback while maintaining clarity for all users.
        </p>
      </div>
      <div className="flex items-center justify-center w-full md:w-1/2">
        <img
          src="/about/accessibility.png"
          alt="Features Image"
          className="w-full about-image transition-transform duration-300 ease-in-out hover:scale-105"
        />
      </div>
    </motion.div>
  );
};

export default UserCentricDesgin;
