import React from "react";

const CompetititveProgrammingStatsSection = () => {
  return (
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
  );
};

export default CompetititveProgrammingStatsSection;
