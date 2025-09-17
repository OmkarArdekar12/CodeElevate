import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleRight } from "@fortawesome/free-solid-svg-icons";
import {
  SiLeetcode,
  SiCodeforces,
  SiGeeksforgeeks,
  SiHackerrank,
  SiCodechef,
  SiTopcoder,
} from "react-icons/si";
import { GiHorseHead } from "react-icons/gi";

const ProfilePage = () => {
  const tags = ["Coder", "Dominator", "TeamPlayer"];
  return (
    <div className="w-full flex items-center justify-center md:px-10 text-white">
      <div className="w-full flex flex-col items-center justify-center pb-5 bg-[#181818]">
        {/* bgBanner */}
        <div className="w-full flex items-center justify-center relative">
          <img
            src="/images/bgBannerImage.png"
            alt="backgroundBannerImage"
            className="w-full h-45 md:h-70 rounded-b-2xl object-fill"
          />
        </div>
        {/* username & headline */}
        <div className="w-full flex flex-col items-center relative -mt-20 z-1 md:flex-row md:pl-20">
          <img
            src="/images/userImage.png"
            alt="userImage"
            className="w-39 h-39 flex items-center justify-center md:w-70 md:h-70 rounded-full border-3 border-white object-cover"
          />
          <div className="flex flex-col justify-center items-center md:items-start mt-10 md:ml-4 text-white text-5xl font-semibold">
            <h1>Username</h1>
            <h2 className="mt-1 text-4xl">Headline</h2>
          </div>
        </div>
        {/* button section */}
        <div className="w-full mt-10 inline-flex flex-wrap items-center justify-center md:justify-start md:pl-25">
          <button className="bg-blue-500 py-2 px-4 m-1 rounded-md hover:text-white hover:border-1 hover-text-border hover:bg-gradient-to-r hover:from-blue-500 hover:via-blue-600 hover:to-blue-700">
            Follow
          </button>
          <button className="bg-blue-500 py-2 px-4 m-1 rounded-md hover:text-white hover:border-1 hover-text-border hover:bg-gradient-to-r hover:from-blue-500 hover:via-blue-600 hover:to-blue-700">
            Following
          </button>
          <button className="bg-blue-500 py-2 px-4 m-1 rounded-md hover:text-white hover:border-1 hover-text-border hover:bg-gradient-to-r hover:from-blue-500 hover:via-blue-600 hover:to-blue-700">
            Connect
          </button>
        </div>
        {/* about */}
        <hr className="w-full text-gray-600 mt-10 mb-8" />
        <div className="w-full flex flex-col justify-center p-4">
          <h2 className="text-3xl mb-3">About</h2>
          <h3 className="text-lg">Here the about section</h3>
        </div>
        {/* domain & role */}
        <hr className="w-full text-gray-600 my-6" />
        <div className="w-full flex flex-col justify-center p-4">
          <h2 className="text-3xl mb-3">Domain & Role</h2>
          <div className="w-full flex items-center flex-wrap">
            <h3 className="bg-indigo-500 inline px-4 py-2 rounded-lg text-lg mx-2 my-1 hover-text-border text-center">
              <FontAwesomeIcon
                icon={faCircleRight}
                className="text-black mr-1"
              />
              Role: SDE
            </h3>
            <h3 className="bg-teal-500 inline px-4 py-2 rounded-lg text-lg mx-2 my-1 hover-text-border text-center align-middle">
              <FontAwesomeIcon
                icon={faCircleRight}
                className="text-black mr-1"
              />
              Domain: AWS
            </h3>
          </div>
        </div>
        {/* Tags */}
        <hr className="w-full text-gray-600 my-6" />
        <div className="w-full flex flex-col justify-center p-4">
          <h2 className="text-3xl mb-3">Tags</h2>
          <div className="w-full flex items-center flex-wrap">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 shadow-cyan-300 text-white inline m-1 py-1 px-2 rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        {/* CP */}
        <hr className="w-full text-gray-600 my-6" />
        <div className="w-full flex flex-col justify-center p-4">
          <h2 className="text-3xl mb-1">
            Competitive Programming / Data Structures & Algorithms
          </h2>
          <div>
            <div>LeetCode</div>
            <div>Codeforces</div>
            <div>AtCoder</div>
            <div>CodeChef</div>
            <div>GeeksForGeeks</div>
            <div>HackerRank</div>
          </div>
        </div>
        <div>DevelopmentProfile</div>
        <div>Education</div>
        <div>Posts</div>
      </div>
    </div>
  );
};

export default ProfilePage;
