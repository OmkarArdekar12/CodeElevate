import React from "react";
import { motion } from "framer-motion";

const ResponsiveDesignFeature = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="w-full flex flex-col md:flex-row items-center px-4 gap-2 py-10 text-gray-200 transition-all duration-300 ease-in-out"
    >
      <div className="flex items-center justify-center w-full md:w-1/2">
        <img
          src="/about/responsiveness.png"
          alt="Responsiveness Image"
          className="w-full about-image transition-transform duration-300 ease-in-out hover:scale-105"
        />
      </div>
      <div className="flex flex-col items-center justify-center w-full md:w-1/2 text-md md:text-xl px-2 md:px-14 gap-3">
        <h2 className="text-xl md:text-3xl font-semibold text-center">
          Responsive Design
        </h2>
        <p>
          The entire CodeElevate website is fully responsive, ensuring an
          optimal viewing experience across all screen sizes and devices. It
          features smooth animations that enhance user interaction without
          overwhelming the interface, combined with a clean and modern UI
          design. This thoughtful combination of responsiveness, fluidity, and
          aesthetics makes the site intuitive and visually appealing whether
          accessed on desktops, tablets, or mobile phones.
        </p>
      </div>
    </motion.div>
  );
};

export default ResponsiveDesignFeature;
