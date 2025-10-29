import React from "react";
import { motion } from "framer-motion";

const RankingSystemFeature = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="w-full flex flex-col items-center px-4 gap-2 py-10 text-gray-200 transition-all duration-300 ease-in-out"
    >
      <div className="flex flex-col md:flex-row items-center justify-center w-full gap-2">
        <img
          src="/about/rankingSystem.png"
          alt="Ranking System Image"
          className="w-full md:w-1/2 about-image transition-transform duration-300 ease-in-out hover:scale-105"
        />
        <img
          src="/about/rankingFilters.png"
          alt="Ranking Filter Image"
          className="w-full md:w-1/2 about-image transition-transform duration-300 ease-in-out hover:scale-105"
        />
      </div>
      <div className="flex flex-col items-center justify-center w-full text-md md:text-xl px-2 md:px-14 gap-3">
        <h2 className="text-xl md:text-3xl font-semibold text-center">
          Ranking System
        </h2>
        <div>
          The ranking system in CodeElevate includes five categories:
          Competitive Programmers, Developers, Rankers, Contributors, and All
          Rounders. Each category assigns scores based on various metrics such
          as problem-solving and contest RealTimeMessagingSystemFeature progress
          on platforms like LeetCode and Codeforces, contributions and
          repository activity on GitHub, and academic achievements like CGPA.
          The system fetches real-time data from APIs, calculates scores for
          each user, and sorts users to generate leaderboards for each category.
          <p>
            Each category calculates scores using specific formulas based on
            user data gathered from external platforms and profile details:
          </p>
          <ul className="w-full">
            <li>
              <p className="flex flex-col items-start">
                <span className="font-semibold">
                  &#8226; Competitive Programmers (<i>cpScore</i>):
                </span>
                <code className="text-sm pl-3">
                  &#9658; cpScore = (1.5 * ContestRating<sub>Codeforces</sub>) +
                  (ContestRating<sub>LeetCode</sub>) + (TotalProblemSolved
                  <sub>LeetCode</sub>) + (TotalProblemsSolved
                  <sub>Codeforces</sub>)
                </code>
              </p>
            </li>
            <li>
              <p className="flex flex-col items-start">
                <span className="font-semibold">
                  &#8226; Developers (<i>devScore</i>):
                </span>
                <code className="text-sm pl-3">
                  &#9658; devScore = (3 * PublicRepositories<sub>GitHub</sub>) +
                  (5 * TotalRepositoriesStars<sub>GitHub</sub>) + (2 * Followers
                  <sub>GitHub</sub>)
                </code>
              </p>
            </li>
            <li>
              <p className="flex flex-col items-start">
                <span className="font-semibold">
                  &#8226; Rankers (<i>rankerScore</i>):
                </span>
                <code className="text-sm pl-3">
                  &#9658; rankerScore = 10 * CGPA
                </code>
              </p>
            </li>

            <li>
              <p className="flex flex-col items-start">
                <span className="font-semibold">
                  &#8226; Contributors (<i>contributorScore</i>):
                </span>
                <code className="text-sm pl-3">
                  &#9658; contributorScore = cpScore + devScore
                </code>
              </p>
            </li>

            <li>
              <p className="flex flex-col items-start">
                <span className="font-semibold">
                  &#8226; All Rounders (<i>allRounderScore</i>):
                </span>
                <code className="text-sm pl-3">
                  &#9658; allRoundersScore = cpScore + devScore + rankerScore
                </code>
              </p>
            </li>
          </ul>
          <p className="italic font-thin">
            *This ranking system is updated every 24 hours to reflect the latest
            user achievements and activity.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default RankingSystemFeature;
