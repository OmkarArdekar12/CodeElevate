import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import {
  SiLeetcode,
  SiCodeforces,
  SiGeeksforgeeks,
  SiHackerrank,
  SiCodechef,
  SiTopcoder,
} from "react-icons/si";
import { GiHorseHead } from "react-icons/gi";
import { FiExternalLink } from "react-icons/fi";

const CompetitiveProgrammingSection = () => {
  return (
    <div className="w-full flex flex-col justify-center p-4">
      <h2 className="text-3xl mb-1 title-font">
        Competitive Programming / Data Structures & Algorithms
      </h2>
      <div className="mt-4 p-4 md:px-25">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex items-center space-x-2 flex-wrap">
            <FaCheckCircle className="text-blue-500 w-5 h-5 inline" />
            <div className="flex items-center space-x-1 flex-wrap group">
              <SiLeetcode className="text-[#FFA116] w-9 h-9" />
              <a
                href="#"
                target="_blank"
                className="text-2xl hover-text-border hover:underline hover:decoration-[#FFA116] hover:decoration-2"
              >
                LeetCode
              </a>
              <FiExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </div>
          </div>
          <div className="flex items-center space-x-2 flex-wrap">
            <FaCheckCircle className="text-blue-500 w-5 h-5" />
            <div className="flex items-center space-x-1 flex-wrap group">
              <SiCodeforces className="text-[#1F8ACB] w-9 h-9" />
              <a
                href="#"
                target="_blank"
                className="text-2xl hover-text-border hover:underline hover:decoration-[#1F8ACB] hover:decoration-2"
              >
                Codeforces
              </a>
              <FiExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </div>
          </div>
          <div className="flex items-center space-x-2 flex-wrap">
            <FaCheckCircle className="text-blue-500 w-5 h-5" />
            <div className="flex items-center space-x-1 flex-wrap group">
              <GiHorseHead className="text-gray-700 w-9 h-9" />
              <a
                href="#"
                target="_blank"
                className="text-2xl hover-text-border hover:underline hover:decoration-gray-700 hover:decoration-2"
              >
                AtCoder
              </a>
              <FiExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </div>
          </div>
          <div className="flex items-center space-x-2 flex-wrap">
            <FaCheckCircle className="text-blue-500 w-5 h-5" />
            <div className="flex items-center space-x-1 flex-wrap group">
              <SiCodechef className="text-[#5B4638] w-9 h-9" />
              <a
                href="#"
                target="_blank"
                className="text-2xl hover-text-border hover:underline hover:decoration-[#5B4638] hover:decoration-2"
              >
                CodeChef
              </a>
              <FiExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </div>
          </div>
          <div className="flex items-center space-x-2 flex-wrap">
            <FaCheckCircle className="text-blue-500 w-5 h-5" />
            <div className="flex items-center space-x-1 flex-wrap group">
              <SiGeeksforgeeks className="text-[#2F8D46] w-9 h-9" />
              <a
                href="#"
                target="_blank"
                className="text-2xl hover-text-border hover:underline hover:decoration-[#2F8D46] hover:decoration-2"
              >
                GeeksforGeeks
              </a>
              <FiExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </div>
          </div>
          <div className="flex items-center space-x-2 flex-wrap">
            <FaCheckCircle className="text-blue-500 w-5 h-5" />
            <div className="flex items-center space-x-1 flex-wrap group">
              <SiHackerrank className="text-[#2EC866] w-9 h-9" />
              <a
                href="#"
                target="_blank"
                className="text-2xl hover-text-border hover:underline hover:decoration-[#2EC866] hover:decoration-2"
              >
                HackerRank
              </a>
              <FiExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetitiveProgrammingSection;
