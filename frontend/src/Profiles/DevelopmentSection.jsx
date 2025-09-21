import React from "react";
import { FaGithub, FaGitlab, FaLaptopCode } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { FiBriefcase } from "react-icons/fi";
import GitHubCardStats from "../components/GitHubCardStats.jsx";
import { FaDotCircle } from "react-icons/fa";

const DevelopmentSection = () => {
  return (
    <>
      <div className="w-full flex flex-col justify-center p-4">
        <h2 className="text-3xl mb-1 title-font">Development Profiles</h2>
        <div className="mt-4 p-4 md:px-25">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-center space-x-2 flex-wrap">
              <FaCheckCircle className="text-blue-500 w-5 h-5 inline" />
              <div className="flex items-center space-x-1 flex-wrap group">
                <FaGithub className="text-white w-9 h-9" />
                <a
                  href="#"
                  target="_blank"
                  className="text-2xl hover-text-border hover:underline hover:decoration-[#FFA116] hover:decoration-2"
                >
                  GitHub
                </a>
                <FiExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </div>
            </div>
            <div className="flex items-center space-x-2 flex-wrap">
              <FaCheckCircle className="text-blue-500 w-5 h-5 inline" />
              <div className="flex items-center space-x-1 flex-wrap group">
                <FaGitlab className="text-[#FC6D26] w-9 h-9" />
                <a
                  href="#"
                  target="_blank"
                  className="text-2xl hover-text-border hover:underline hover:decoration-[#FFA116] hover:decoration-2"
                >
                  GitLab
                </a>
                <FiExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </div>
            </div>
            <div className="flex items-center space-x-2 flex-wrap">
              <FaCheckCircle className="text-blue-500 w-5 h-5" />
              <div className="flex items-center space-x-1 flex-wrap group">
                <FaLaptopCode className="text-[#2563EB] w-9 h-9" />
                <a
                  href="#"
                  target="_blank"
                  className="text-2xl hover-text-border hover:underline hover:decoration-[#1F8ACB] hover:decoration-2"
                >
                  Portfolio
                </a>
                <FiExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="w-full text-gray-600 my-10" />
    </>
  );
};

export default DevelopmentSection;
