import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MdOutlineLeaderboard } from "react-icons/md";
import { FaCrown } from "react-icons/fa";
import { FaMedal } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Rank from "./Rank";

const RankingList = ({ rankings = [], rankName, score }) => {
  if (!rankings && rankings.length == 0) {
    return null;
  }

  return (
    <div className="w-full flex flex-col items-center justify-around pt-5 px-1 md:px-6 pb-6 transition-all duration-300 ease-in-out">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full flex flex-col sm:flex-row flex-wrap items-center gap-2 justify-center text-2xl md:text-3xl font-semibold text-white tracking-wide pb-5"
      >
        <span className="text-center text-blue-400">Top {rankName} </span>
        <span className="flex flex-wrap items-center gap-1">
          Leaderboard <MdOutlineLeaderboard className="size-9" />
        </span>
      </motion.h1>
      <div className="w-full flex flex-col gap-5">
        {rankings.map((ranker, index) => (
          <Rank ranker={ranker} score={score} index={index} key={index} />
        ))}
      </div>
    </div>
  );
};

export default RankingList;
