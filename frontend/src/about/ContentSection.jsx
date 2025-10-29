import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const ContentSection = () => {
  return (
    <div className="w-full text-center px-6">
      <h1 className="text-2xl md:text-4xl font-bold text-orange-500">
        Omkar Ardekar
      </h1>
      <h2 className="text-xl md:text-2xl font-semibold text-white mt-3">
        Creator & Full-Stack Developer of{" "}
        <span className="text-blue-600">CodeElevate</span>
      </h2>
      <div className="flex justify-center gap-6 mt-6">
        <a
          href="https://github.com/OmkarArdekar12"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 hover:text-red-500 transition-colors duration-100"
        >
          <FaGithub className="size-5" />
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/omkarardekar09"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 hover:text-red-500 transition-colors duration-100"
        >
          <FaLinkedin className="size-5" />
          LinkedIn
        </a>
      </div>
    </div>
  );
};

export default ContentSection;
