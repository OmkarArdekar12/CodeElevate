import React from "react";
import { FaGithub } from "react-icons/fa";

const gitHubData = {
  userId: "OmkarArdekar12",
  name: "Omkar Prakash Ardekar",
  avatarUrl: "https://avatars.githubusercontent.com/u/178113083?v=4",
  bio: "Mastering core fundamentals concepts to advanced concepts through continuous learning",
  publicRepos: 9,
  followers: 0,
  following: 0,
  totalStars: 0,
};

const GitHubCardStats = () => {
  return (
    <div className="w-[90%] lg:w-[37%] m-1 my-4 p-6 text-white bg-gray-900 rounded-2xl shadow-xl border border-gray-100">
      <div className="flex flex-wrap items-center justify-center">
        <FaGithub />
        <span className="text-white text-2xl text-border">
          {gitHubData.userId}
        </span>
      </div>
      <hr className="text-gray-500 my-4" />
      <div className="flex flex-wrap justify-center items-center mb-3">
        {gitHubData.avatarUrl && (
          <div className="flex items-center flex-wrap">
            <img src={gitHubData.avatarUrl} alt="githubProfileImage" />
          </div>
        )}
        <div className="flex flex-col justify-center items-center flex-wrap">
          {gitHubData.name && <h3 className="text-xl">{gitHubData.name}</h3>}
          {gitHubData.bio && <h5 className="text-sm">{gitHubData.bio}</h5>}
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2 mb-3">
        {leetCodeData.ranking && (
          <>
            <span className="text-xl font-semibold">Ranking:</span>
            <span className="text-2xl text-white rounded-md font-bold">
              {leetCodeData.ranking.toLocaleString() +
                " / " +
                leetCodeData.totalLeetCodeUsers.toLocaleString()}
            </span>
          </>
        )}
        <span className="ml-auto text-white">
          <span className="text-xl">Badges: {leetCodeData.numberOfBadges}</span>
        </span>
      </div>
      <div className="flex justify-between my-2 px-6">
        <div className="text-center">
          <div className="font-bold text-orange-400">
            {leetCodeData.maxStreak}
          </div>
          <div className="text-sm text-gray-200">Max Streak</div>
        </div>
        <div className="text-center">
          <div className="font-bold text-indigo-700">
            {leetCodeData.totalActiveDays}
          </div>
          <div className="text-sm text-gray-200">Active Days</div>
        </div>
      </div>
      <div className="bg-gray-50 rounded-lg p-4 mb-3">
        <div className="text-gray-600 mb-1 font-semibold text-md">
          Problems Solved
        </div>
        <div className="flex justify-between gap-3">
          <div className="flex flex-col items-center flex-1">
            <div className="font-bold text-green-500 text-2xl">
              {leetCodeData.easySolved}
            </div>
            <span className="font-medium text-sm text-gray-500">Easy</span>
          </div>
          <div className="flex flex-col items-center flex-1">
            <div className="font-bold text-yellow-500 text-2xl">
              {leetCodeData.mediumSolved}
            </div>
            <span className="font-medium text-sm text-gray-500">Medium</span>
          </div>
          <div className="flex flex-col items-center flex-1">
            <div className="font-bold text-red-500 text-2xl">
              {leetCodeData.hardSolved}
            </div>
            <span className="font-medium text-sm text-gray-500">Hard</span>
          </div>
        </div>
        <div className="text-center mt-2">
          <span className="text-xl text-gray-700 font-bold">
            Total: {leetCodeData.totalSolved}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-3">
        {leetCodeData.topGlobalPercentage && (
          <div className="p-2 shadow shadow-amber-50 rounded-md">
            <div className="font-semibold text-sm text-gray-100">
              Global Top Percentage
            </div>
            <div className="text-lg text-amber-300 font-bold">
              {leetCodeData.topGlobalPercentage.toFixed(2)}%
            </div>
          </div>
        )}
        {leetCodeData.topPercentage && (
          <div className="p-2 shadow shadow-amber-50 rounded-md">
            <div className="font-semibold text-sm text-gray-100">
              Contest Top Percentage
            </div>
            <div className="text-lg font-bold text-green-600">
              {leetCodeData.topPercentage.toFixed(2)}%
            </div>
          </div>
        )}
        {leetCodeData.contestRating && (
          <div className="p-2 shadow shadow-amber-50 rounded-md">
            <div className="font-semibold text-sm text-gray-100">
              Contest Rating
            </div>
            <div className="text-lg font-bold text-blue-600">
              {Math.round(leetCodeData.contestRating)}
            </div>
          </div>
        )}
        {leetCodeData.contestRank && (
          <div className="p-2 shadow shadow-amber-50 rounded-md">
            <div className="font-semibold text-sm text-gray-100">
              Contest Rank
            </div>
            <div className="text-lg">
              {leetCodeData.contestRank +
                " / " +
                leetCodeData.totalContestParticipants.toLocaleString()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GitHubCardStats;
