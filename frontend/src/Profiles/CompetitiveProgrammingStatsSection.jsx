import React, { useState, useEffect } from "react";
import LeetCodeCardStats from "../components/LeetCodeCardStats.jsx";
import CodeforcesCardStats from "../components/CodeforcesCardStats.jsx";

const CompetitiveProgrammingStatsSection = ({ leetcode, codeforces }) => {
  if (!leetcode && !codeforces) {
    return null;
  }

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

  // const fetchCompetitiveProgrammingStats = async (
  //   leetcodeUsername,
  //   codeforcesUsername
  // ) => {
  //   const leetcodeData = await leetCodeStats(leetcodeUsername);
  //   setUserLeetCodeData(leetcodeData.data);
  //   const codeforcesData = await codeforcesStats(codeforcesUsername);
  //   setUserCodeforcesData(codeforcesData.data);
  //   // console.log(leetcodeData);
  //   // console.log(codeforcesData);
  // };

  // useEffect(() => {
  //   fetchCompetitiveProgrammingStats({ leetcode }, { codeforces });
  // }, []);

  return (
    <>
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
      <hr className="w-full text-gray-600 my-10" />
    </>
  );
};

export default CompetitiveProgrammingStatsSection;
