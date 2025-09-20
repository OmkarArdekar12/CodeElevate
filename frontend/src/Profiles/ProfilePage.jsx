import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleRight } from "@fortawesome/free-solid-svg-icons";
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
import { useState, useEffect } from "react";
import {
  leetCodeStats,
  codeforcesStats,
} from "../service/competitiveProgrammingStatsApi.js";
import LeetCodeCardStats from "../components/LeetCodeCardStats.jsx";
import CodeforcesCardStats from "../components/CodeforcesCardStats.jsx";
import { FaGithub, FaGitlab, FaLaptopCode } from "react-icons/fa";
import { FiBriefcase } from "react-icons/fi";
import GitHubCardStats from "../components/GitHubCardStats.jsx";
import { FaDotCircle } from "react-icons/fa";

const ProfilePage = () => {
  const tags = ["Coder", "Dominator", "TeamPlayer"];
  const [userLeetCodeData, setUserLeetCodeData] = useState({
    username: "Omkaarr_01",
    totalLeetCodeUsers: 5000001,
    ranking: 1,
    easySolved: 300,
    mediumSolved: 900,
    hardSolved: 600,
    totalSolved: 300 + 900 + 600,
    numberOfBadges: 100,
    badgeNames: [
      "Submission Badge",
      "Submission Badge",
      "Annual Badge",
      "Annual Badge",
      "Annual Badge",
      "Annual Badge",
      "Annual Badge",
      "Annual Badge",
      "Daily Coding Challenge",
      "Daily Coding Challenge",
      "Daily Coding Challenge",
      "Daily Coding Challenge",
      "Daily Coding Challenge",
      "Daily Coding Challenge",
      "Daily Coding Challenge",
      "Daily Coding Challenge",
      "Daily Coding Challenge",
      "Daily Coding Challenge",
      "Daily Coding Challenge",
      "Daily Coding Challenge",
      "Daily Coding Challenge",
      "Daily Coding Challenge",
      "Daily Coding Challenge",
      "Daily Coding Challenge",
      "Study Plan V2 Award",
      "Study Plan V2 Award",
      "Study Plan V2 Award",
      "Study Plan V2 Award",
    ],
    hasKnight: true,
    hasGuardian: true,
    maxStreak: 365,
    totalActiveDays: 365,
    contestRating: 3912,
    contestRank: 1,
    totalContestParticipants: 760696,
    topPercentage: 0.1,
    topGlobalPercentage: 0.005111998977600204,
    contestBadge: null,
    contestsAttended: 39,
  });
  const [userCodeforcesData, setUserCodeforcesData] = useState({
    handle: "Omkaarr",
    rating: 3912,
    contribution: 1000,
    rank: "Grand Master",
    maxRating: 3912,
    maxRank: "Grand Master",
    friendOfCount: 0,
    organization: "N/A",
    lastOnlineTimeSeconds: 1758305442,
    registrationTimeSeconds: 1748916816,
    city: "N/A",
    country: "N/A",
    totalProblemsSolved: 2993,
  });
  const [userGitHubData, setUserGitHubData] = useState({
    userId: "OmkarArdekar12",
    name: "Omkar Prakash Ardekar",
    avatarUrl: "https://avatars.githubusercontent.com/u/178113083?v=4",
    bio: "Mastering core fundamentals concepts to advanced concepts through continuous learning",
    publicRepos: 910,
    followers: 100000000000000,
    following: 0,
    totalStars: 1000000000000,
  });
  const [userEducation, setUserEducation] = useState({
    degree: "B.Tech",
    cgpa: 9.98999999,
    institution: "IIT Bombay",
  });

  // const fetchCompetitiveProgrammingStats = async (
  //   leetcodeUsername,
  //   codeforcesUsername
  // ) => {
  //   const leetcodeData = await leetCodeStats(leetcodeUsername);
  //   setUserLeetCodeData(leetcodeData.data);
  //   const codeforcesData = await codeforcesStats(codeforcesUsername);
  //   setUserCodeforcesData(codeforcesData.data);
  //   console.log(leetcodeData);
  //   console.log(codeforcesData);
  // };

  // useEffect(() => {
  //   fetchCompetitiveProgrammingStats("", "");
  // }, []);

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
          <button className="bg-blue-500 py-2 px-4 m-1 rounded-md hover:text-white hover:border-1 hover-text-border hover:bg-gradient-to-r hover:from-blue-500 hover:via-blue-600 hover:to-blue-700">
            Message
          </button>
        </div>
        {/* about */}
        <hr className="w-full text-gray-600 mt-25 mb-10" />
        <div className="w-full flex flex-col justify-center p-4">
          <h2 className="text-3xl mb-3 title-font">About</h2>
          <h3 className="text-lg">Here the about section</h3>
        </div>
        {/* domain & role */}
        <hr className="w-full text-gray-600 my-10" />
        <div className="w-full flex flex-col justify-center p-4">
          <h2 className="text-3xl mb-3 title-font">Domain & Role</h2>
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
        <hr className="w-full text-gray-600 my-10" />
        <div className="w-full flex flex-col justify-center p-4">
          <h2 className="text-3xl mb-3 title-font">Tags</h2>
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
        <hr className="w-full text-gray-600 my-10" />
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
        {/* CP Stats */}
        <hr className="w-full text-gray-600 my-10" />
        <div className="w-full flex flex-col justify-center p-4">
          <h2 className="text-3xl mb-1 title-font">Coding Profiles Stats</h2>
          <div className="flex justify-center flex-col lg:flex-row lg:justify-evenly items-center flex-wrap mt-4 p-4 md:px-25">
            {Object.keys(userLeetCodeData).length !== 0 && (
              <LeetCodeCardStats leetCodeData={userLeetCodeData} />
            )}
            {JSON.stringify(userCodeforcesData) !== "{}" && (
              <CodeforcesCardStats codeforcesData={userCodeforcesData} />
            )}
          </div>
        </div>
        {/* Devs */}
        <hr className="w-full text-gray-600 my-10" />
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
        {/* DP stats */}
        <hr className="w-full text-gray-600 my-10" />
        <div className="w-full flex flex-col justify-center p-4">
          <h2 className="text-3xl mb-1 title-font">
            Development Profiles Stats
          </h2>
          <div className="flex justify-center flex-col lg:flex-row lg:justify-evenly items-center flex-wrap mt-4 p-4 md:px-25">
            {userGitHubData && <GitHubCardStats gitHubData={userGitHubData} />}
          </div>
        </div>
        {/* Edu */}
        <hr className="w-full text-gray-600 my-10" />
        <div className="w-full flex flex-col justify-center p-4">
          <h2 className="text-3xl mb-1 title-font">Education</h2>
          <div className="flex justify-center flex-col lg:flex-row lg:justify-evenly flex-wrap mt-4 p-4 md:px-25 text-2xl">
            {userEducation.degree && (
              <p>
                <FaDotCircle className="inline mr-2 text-gray-600 text-sm" />
                <span className="italic">Degree:</span> {userEducation.degree}
              </p>
            )}
            {userEducation.cgpa && (
              <p>
                <FaDotCircle className="inline mr-2 text-gray-600 text-sm" />
                <span className="italic">CGPA:</span>{" "}
                {userEducation.cgpa.toFixed(2)}
              </p>
            )}
            {userEducation.institution && (
              <p>
                <FaDotCircle className="inline mr-2 text-gray-600 text-sm" />
                <span className="italic">Insitution:</span>{" "}
                {userEducation.institution}
              </p>
            )}
          </div>
        </div>
        {/* Socials */}
        <hr className="w-full text-gray-600 my-10" />
        <div className="w-full flex flex-col justify-center p-4">
          <h2 className="text-3xl mb-1 title-font">Socials</h2>
          <div className="flex justify-center flex-col lg:flex-row lg:justify-evenly items-center flex-wrap mt-4 p-4 md:px-25"></div>
        </div>
        <hr className="w-full text-gray-600 my-10" />
        {/* Posts */}
        <div>Posts</div>
      </div>
    </div>
  );
};

export default ProfilePage;
