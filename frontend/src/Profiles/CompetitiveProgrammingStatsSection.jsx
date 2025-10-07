import React, { useState, useEffect } from "react";
import LeetCodeCardStats from "../components/LeetCodeCardStats.jsx";
import CodeforcesCardStats from "../components/CodeforcesCardStats.jsx";
import {
  leetCodeStats,
  codeforcesStats,
} from "../service/competitiveProgrammingStatsApi.js";

const CompetitiveProgrammingStatsSection = ({ leetcode, codeforces }) => {
  if (!leetcode && !codeforces) {
    return null;
  }

  const [userLeetCodeData, setUserLeetCodeData] = useState({});
  const [userCodeforcesData, setUserCodeforcesData] = useState({});

  const fetchCompetitiveProgrammingStats = async (
    leetcodeUsername,
    codeforcesUsername
  ) => {
    try {
      if (leetcodeUsername) {
        const leetcodeData = await leetCodeStats(leetcodeUsername);
        setUserLeetCodeData(leetcodeData);
      }
    } catch (err) {
      console.log("Invalid LeetCode Username");
      setUserLeetCodeData({});
    }
    try {
      if (codeforcesUsername) {
        const codeforcesData = await codeforcesStats(codeforcesUsername);
        setUserCodeforcesData(codeforcesData);
      }
    } catch (err) {
      console.log("Invalid Codeforces Username");
      setUserCodeforcesData({});
    }
    // console.log(leetcodeData);
    // console.log(codeforcesData);
  };
  useEffect(() => {
    fetchCompetitiveProgrammingStats(leetcode, codeforces);
  }, []);
  // const fetchLeetCodeStats = async (leetcodeUsername) => {
  //   try {
  //     const leetcodeData = await leetCodeStats(leetcodeUsername);
  //     setUserLeetCodeData(leetcodeData);
  //   } catch (err) {
  //     console.log("Invalid LeetCode Username");
  //     setUserLeetCodeData({});
  //   }
  // };
  // const fetchCodeforcesStats = async (codeforcesUsername) => {
  //   try {
  //     const codeforcesData = await codeforcesStats(codeforcesUsername);
  //     setUserCodeforcesData(codeforcesData);
  //   } catch (err) {
  //     console.log("Invalid Codeforces Username");
  //     setUserCodeforcesData({});
  //   }
  // };
  // useEffect(() => {
  //   fetchLeetCodeStats(leetcode);
  //   fetchCodeforcesStats(codeforces);
  // }, []);

  return (
    <>
      <div className="w-full flex flex-col justify-center p-4 transition-all duration-300 ease-in-out">
        <h2 className="text-2xl md:text-3xl mb-1 title-font">
          Coding Profiles Stats
        </h2>
        <div className="flex justify-center flex-col lg:flex-row lg:justify-evenly items-center flex-wrap mt-4 p-4 md:px-19">
          {userLeetCodeData && Object.keys(userLeetCodeData).length !== 0 && (
            <LeetCodeCardStats leetCodeData={userLeetCodeData} />
          )}
          {userCodeforcesData &&
            JSON.stringify(userCodeforcesData) !== "{}" && (
              <CodeforcesCardStats codeforcesData={userCodeforcesData} />
            )}
        </div>
      </div>
      <hr className="w-full text-gray-600 my-10" />
    </>
  );
};

export default CompetitiveProgrammingStatsSection;
