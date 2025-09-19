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
    <div className="w-[90%] md:w-[60%] m-1 my-4 p-6 text-white bg-gray-900 rounded-2xl shadow-xl border border-gray-100">
      <div className="flex flex-wrap items-center justify-center">
        <FaGithub className="w-9 h-9 mr-2" />
        <span className="text-white text-2xl text-border">
          {gitHubData.userId}
        </span>
      </div>
      <hr className="text-gray-500 my-4" />
      <div className="flex flex-wrap justify-center items-center mb-3 px-10">
        {gitHubData.avatarUrl && (
          <div className="inline-flex items-center flex-wrap flex-1/2">
            <img
              src={gitHubData.avatarUrl}
              alt="githubProfileImage"
              className="w-50 rounded-full object-cover border-2 border-gray-50"
            />
          </div>
        )}
        <div className="inline-flex flex-col justify-center items-center flex-wrap flex-1/2">
          {gitHubData.name && (
            <h3 className="inline-flex flex-wrap items-center justify-center text-3xl mb-3">
              {gitHubData.name}
            </h3>
          )}
          {gitHubData.bio && (
            <h5 className="inline-flex flex-wrap text-sm">{gitHubData.bio}</h5>
          )}
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className="ml-auto text-white">
          <span className="text-xl">
            Total Public Repositories: {gitHubData.publicRepos}
          </span>
        </span>
        <span className="ml-auto text-white">
          <span className="text-xl">Total Stars: {gitHubData.totalStars}</span>
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className="ml-auto text-white">
          <span className="text-xl">Follower: {gitHubData.followers}</span>
        </span>
        <span className="ml-auto text-white">
          <span className="text-xl">Follwing: {gitHubData.following}</span>
        </span>
      </div>
    </div>
  );
};

export default GitHubCardStats;
