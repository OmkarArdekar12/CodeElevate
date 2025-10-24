import React, { useState, useEffect } from "react";
import GitHubCardStats from "../components/GitHubCardStats.jsx";
import { gitHubStats } from "../service/developmentProfilesStatsApi.js";

const DevelopmentStatsSection = ({ github }) => {
  if (!github) {
    return null;
  }

  const [userGitHubData, setUserGitHubData] = useState({});

  const fetchDevelopmentProfilesStats = async (gitHubUsername) => {
    try {
      if (gitHubUsername) {
        const gitHubData = await gitHubStats(gitHubUsername);
        setUserGitHubData(gitHubData);
      }
    } catch (err) {
      //console.log("Invalid GitHub Username");
      setUserGitHubData({});
    }
  };

  useEffect(() => {
    fetchDevelopmentProfilesStats(github);
  }, [github]);

  return (
    <>
      <div className="w-full flex flex-col justify-center p-4 transition-all duration-300 ease-in-out">
        <h2 className="text-2xl md:text-3xl mb-1 title-font">
          Development Profiles Stats
        </h2>
        <div className="flex justify-center flex-col lg:flex-row lg:justify-evenly items-center flex-wrap mt-4 p-4 md:px-25">
          {(userGitHubData && Object.keys(userGitHubData).length) !== 0 && (
            <GitHubCardStats gitHubData={userGitHubData} />
          )}
        </div>
      </div>
      <hr className="w-full text-gray-600 my-10" />
    </>
  );
};

export default DevelopmentStatsSection;
