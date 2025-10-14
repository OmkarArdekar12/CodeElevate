import React from "react";

export default function LeetCodeCardStats({ leetCodeData }) {
  if (!leetCodeData) {
    return null;
  }

  const badgeColors = {
    Guardian: "bg-yellow-400 text-gray-900",
    Knight: "bg-amber-100 text-black",
  };

  return (
    <div className="w-[95%] sm:w-[27rem] m-1 my-4 p-6 text-white bg-slate-950 rounded-2xl shadow-xl border border-gray-100 stats-card-leetcode transition-all duration-200 ease-in-out">
      <div className="flex flex-wrap items-center justify-center">
        <img
          src="/images/LeetCodeLogo.png"
          alt="LeetCode"
          className="w-9 h-9 mr-2"
        />
        {leetCodeData.username && (
          <span className="text-white text-2xl text-border">
            {leetCodeData.username}
          </span>
        )}
      </div>
      <hr className="w-full text-gray-500 my-4" />
      <div className="flex items-center mb-3">
        <div className="flex gap-2">
          {leetCodeData.hasGuardian && (
            <div className="flex flex-wrap items-center justify-center">
              <img
                src="/images/LeetCodeGuardianBadge.png"
                alt="Guardian"
                className="h-12 mr-2"
              />
              <span
                className={`px-3 py-0.5 font-bold rounded-full ${badgeColors.Guardian}`}
              >
                Guardian
              </span>
            </div>
          )}
          {leetCodeData.hasKnight && (
            <div className="flex flex-wrap items-center justify-center">
              <img
                src="/images/LeetCodeKnightBadge.png"
                alt="Knight"
                className="h-12 mr-2"
              />
              <span
                className={`px-3 py-0.5 font-bold rounded-full ${badgeColors.Knight}`}
              >
                Knight
              </span>
            </div>
          )}
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
        {leetCodeData.numberOfBadges >= 0 && (
          <span className="ml-auto text-white">
            <span className="text-xl">
              Badges: {leetCodeData.numberOfBadges}
            </span>
          </span>
        )}
      </div>
      <div className="flex justify-between my-2 px-6">
        {leetCodeData.maxStreak >= 0 && (
          <div className="text-center">
            <div className="font-bold text-orange-400">
              {leetCodeData.maxStreak}
            </div>
            <div className="text-sm text-gray-200">Max Streak</div>
          </div>
        )}
        {leetCodeData.totalActiveDays >= 0 && (
          <div className="text-center">
            <div className="font-bold text-indigo-700">
              {leetCodeData.totalActiveDays}
            </div>
            <div className="text-sm text-gray-200">Active Days</div>
          </div>
        )}
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
}
