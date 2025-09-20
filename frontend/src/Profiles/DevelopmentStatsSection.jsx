import React, { useState } from "react";
import GitHubCardStats from "../components/GitHubCardStats.jsx";

const DevelopmentStatsSection = () => {
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
  return (
    <div className="w-full flex flex-col justify-center p-4">
      <h2 className="text-3xl mb-1 title-font">Development Profiles Stats</h2>
      <div className="flex justify-center flex-col lg:flex-row lg:justify-evenly items-center flex-wrap mt-4 p-4 md:px-25">
        {userGitHubData && <GitHubCardStats gitHubData={userGitHubData} />}
      </div>
    </div>
  );
};

export default DevelopmentStatsSection;
