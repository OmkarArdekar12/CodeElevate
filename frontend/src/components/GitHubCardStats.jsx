import React from "react";
import { FaGithub } from "react-icons/fa";

function formatNumber(num) {
  if (num >= 1000000000) {
    let n = num / 1000000000;
    return Math.round(n * 10) / 10 + "B";
  }
  if (num >= 1000000) {
    let n = num / 1000000;
    return Math.round(n * 10) / 10 + "M";
  }
  if (num >= 1000) {
    let n = num / 1000;
    return Math.round(n * 10) / 10 + "K";
  }
  return num.toString();
}

const GitHubCardStats = ({ gitHubData }) => {
  if (!gitHubData) {
    return null;
  }

  return (
    <div className="w-[90%] lg:w-[60%] m-1 my-4 p-6 text-white from-black via-gray-950 to-gray-900 bg-gradient-to-r rounded-2xl border border-gray-100 text-center">
      <div className="flex flex-col flex-wrap items-center justify-center">
        <div className="flex items-center justify-center">
          <FaGithub className="w-9 h-9 mr-2" />
          <span className="text-white text-2xl text-border">
            {gitHubData.userId}
          </span>
        </div>
        <hr className="text-gray-500 my-4 w-full" />
        {gitHubData.avatarUrl && (
          <div className="flex justify-center items-center flex-wrap mb-3">
            <img
              src={gitHubData.avatarUrl}
              alt="githubProfileImage"
              className="w-50 rounded-full object-cover border-2 border-gray-50"
            />
          </div>
        )}
        <div className="flex flex-col flex-wrap justify-center items-center mb-5">
          <div className="inline-flex flex-col justify-center items-center flex-wrap text-center">
            {gitHubData.name && (
              <h3 className="inline-flex flex-wrap items-center justify-center text-3xl mb-2">
                {gitHubData.name}
              </h3>
            )}
            {gitHubData.bio && (
              <h5 className="w-[80%] lg:w-[75%] inline-flex items-center justify-center text-lg italic">
                {gitHubData.bio}
              </h5>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-3">
          {gitHubData.publicRepos && (
            <div className="p-2 shadow shadow-amber-50 rounded-md">
              <div className="font-semibold text-sm text-gray-100">
                Total Public Repositories
              </div>
              <div className="text-lg text-amber-300 font-bold text-center">
                {gitHubData.publicRepos}
              </div>
            </div>
          )}
          {gitHubData.totalStars >= 0 && (
            <div className="p-2 shadow shadow-amber-50 rounded-md">
              <div className="font-semibold text-sm text-gray-100">
                Total Stars
              </div>
              <div className="text-lg text-amber-300 font-bold text-center">
                {formatNumber(gitHubData.totalStars)}
              </div>
            </div>
          )}
          {gitHubData.followers >= 0 && (
            <div className="p-2 shadow shadow-amber-50 rounded-md">
              <div className="font-semibold text-sm text-gray-100">
                Followers
              </div>
              <div className="text-lg text-amber-300 font-bold text-center">
                {formatNumber(gitHubData.followers)}
              </div>
            </div>
          )}
          {gitHubData.following >= 0 && (
            <div className="p-2 shadow shadow-amber-50 rounded-md">
              <div className="font-semibold text-sm text-gray-100">
                Following
              </div>
              <div className="text-lg text-amber-300 font-bold text-center">
                {formatNumber(gitHubData.following)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GitHubCardStats;
