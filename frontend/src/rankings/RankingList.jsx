import React from "react";
import { motion } from "framer-motion";
import { MdOutlineLeaderboard } from "react-icons/md";
import { FaMedal } from "react-icons/fa";

const getMedalColor = (rank) => {
  if (rank === 1) {
    return "text-yellow-400";
  }
  if (rank === 2) {
    return "text-gray-300";
  }
  if (rank === 3) {
    return "text-amber-600";
  }
  return "";
};

const RankingList = ({ rankings = [], rankName, score }) => {
  if (!rankings || rankings.length === 0) {
    return null;
  }

  return (
    <div className="w-full flex gap-1 items-center justify-around pt-5 md:px-6 pb-5 transition-all duration-300 ease-in-out">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full flex flex-wrap items-center gap-2 justify-center text-2xl md:text-3xl font-semibold text-white tracking-wide pb-4"
      >
        <span className="text-blue-400">Top All Rounders </span>
        <span className="flex flex-wrap items-center gap-1">
          Leaderboard <MdOutlineLeaderboard className="size-9" />
        </span>
      </motion.h1>
      {/* <div className="w-full flex flex-col gap-5">
        {rankers.map((ranker) => (
          <motion.div
            key={ranker.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: ranker.rank * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="relative w-full flex items-center justify-between bg-slate-900/70 backdrop-blur-xl rounded-2xl px-6 py-5 shadow-lg hover:shadow-blue-600/30 border border-slate-800 transition-all"
          >
            <div className="flex items-center gap-4">
              <div
                className={`relative w-13 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-md ${getRankStyle(
                  ranker.rank
                )}`}
              >
                {ranker.rank <= 3 && (
                  <FaCrown
                    className={`absolute -top-3 text-3xl ${
                      ranker.rank === 1
                        ? "text-yellow-300"
                        : ranker.rank === 2
                        ? "text-gray-200"
                        : "text-amber-600"
                    }`}
                  />
                )}
                {ranker.rank}
              </div>
              <img
                src={ranker.image}
                alt={ranker.name}
                className="w-12 h-12 rounded-full border-2 border-slate-700 object-cover"
              />
              <div>
                <h2 className="text-lg font-semibold text-white">
                  {ranker.name}
                </h2>
                <p className="text-sm text-slate-400">Software Engineer</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-blue-400 font-semibold">
                Score: {1000 - ranker.rank * 45}
              </p>
              <p className="text-slate-500 text-sm">Rank #{ranker.rank}</p>
            </div>
          </motion.div>
        ))}
      </div> */}
    </div>
  );
};

export default RankingList;
