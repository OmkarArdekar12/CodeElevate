import React from "react";

const unixToDate = (unixTimestamp) => {
  return new Date(unixTimestamp * 1000).toLocaleDateString();
};

export default function CodeforcesCard({ codeforcesData }) {
  if (!codeforcesData) {
    return null;
  }

  return (
    <div className="w-[95%] sm:w-[27rem] m-1 my-4 text-white bg-slate-950 p-6 rounded-xl shadow-md border border-gray-100 stats-card-codeforces transition-all duration-200 ease-in-out">
      <div className="flex flex-wrap items-center justify-center">
        <img
          src="/images/CodeforcesLogo.png"
          alt="Codeforces"
          className="w-9 h-9 mr-2"
        />
        <span className="text-white text-2xl text-border">
          {codeforcesData.handle}
        </span>
      </div>
      <hr className="w-full text-gray-500 my-4" />
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-2 shadow shadow-amber-50 rounded-md">
          <p className="text-sm text-gray-100">Rating</p>
          <p className="text-xl font-bold text-green-600">
            {codeforcesData.rating}
          </p>
        </div>
        <div className="p-2 shadow shadow-amber-50 rounded-md">
          <p className="text-sm text-gray-100">Max Rating</p>
          <p className="text-xl font-bold text-purple-600">
            {codeforcesData.maxRating}
          </p>
        </div>
        <div className="p-2 shadow shadow-amber-50 rounded-md">
          <p className="text-sm text-gray-100">Rank</p>
          <p className="capitalize text-xl font-bold text-orange-500">
            {codeforcesData.rank}
          </p>
        </div>
        <div className="p-2 shadow shadow-amber-50 rounded-md">
          <p className="text-sm text-gray-100">Max Rank</p>
          <p className="capitalize text-xl font-semibold text-orange-600">
            {codeforcesData.maxRank}
          </p>
        </div>
        <div className="p-2 py-4 shadow shadow-amber-50 rounded-md col-span-2 text-center">
          <p className="text-sm text-gray-100">Total Problems Solved</p>
          <p className="text-3xl font-bold text-border">
            {codeforcesData.totalProblemsSolved}
          </p>
        </div>
      </div>
      <div className="text-gray-100 space-y-2">
        <p>
          <strong className="text-blue-100 italic">Contribution:</strong>{" "}
          {codeforcesData.contribution}
        </p>
        <p>
          <strong className="text-blue-100 italic">Friends Count:</strong>{" "}
          {codeforcesData.friendOfCount}
        </p>
        <p>
          <strong className="text-blue-100 italic">Organization:</strong>{" "}
          {codeforcesData.organization}
        </p>
        <p>
          <strong className="text-blue-100 italic">Location:</strong>{" "}
          {codeforcesData.city}, {codeforcesData.country}
        </p>
        <p>
          <strong className="text-blue-100 italic">Member Since:</strong>{" "}
          {unixToDate(codeforcesData.registrationTimeSeconds)}
        </p>
        <p>
          <strong className="text-blue-100 italic">Last Online:</strong>{" "}
          {unixToDate(codeforcesData.lastOnlineTimeSeconds)}
        </p>
      </div>
    </div>
  );
}
