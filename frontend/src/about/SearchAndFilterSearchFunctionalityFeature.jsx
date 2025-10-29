import React from "react";
import { motion } from "framer-motion";

const SearchAndFilterSearchFunctionalityFeature = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.7 }}
      transition={{ duration: 0.2, ease: "ease" }}
      className="w-full flex flex-col md:flex-row items-center px-4 gap-2 py-10 text-gray-200 transition-all duration-300 ease-in-out"
    >
      <div className="flex items-center justify-center w-full md:w-1/2">
        <img
          src="/about/searchFunctionality.png"
          alt="Search functionality Image"
          className="w-full about-image transition-transform duration-300 ease-in-out hover:scale-105"
        />
      </div>
      <div className="flex flex-col items-center justify-center w-full md:w-1/2 text-md md:text-xl px-2 md:px-14 gap-3">
        <h2 className="text-xl md:text-3xl font-semibold text-center">
          Search and Filter Search Functionality
        </h2>
        <p>
          The search and filter functionality in CodeElevate offers users an
          intuitive way to discover and connect with like-minded individuals,
          while maintaining a smooth and accessible experience. The custom
          search component enables instant profile filtering based on keywords
          typed by the user, matching against fields such as full name,
          username, role, domain, and tags. In addition, the filter section
          provides focused browsing capabilities, letting users quickly narrow
          down profiles by trending status, professional skills, experience
          level, or specific domains. This combined search and filter approach
          makes it effortless to find individuals with matching interests,
          skills, or expertise, supporting deeper networking and collaboration
          opportunities on the platform.
        </p>
      </div>
    </motion.div>
  );
};

export default SearchAndFilterSearchFunctionalityFeature;
