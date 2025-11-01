import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCrown } from "react-icons/fa";
import { FaMedal } from "react-icons/fa";
import { motion } from "framer-motion";
import Loading2 from "../components/Loading2.jsx";

const getRankStyle = (rank) => {
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

const Rank = ({ ranker, score, index }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.06 }}
      whileHover={{ scale: 1.02 }}
      className="relative w-full flex items-center justify-between bg-slate-900/70 backdrop-blur-xl rounded-2xl px-2 sm:px-6 py-5 shadow-lg hover:shadow-blue-600/30 border border-slate-800 transition-all"
    >
      <div className="flex items-center gap-3">
        <div
          className={`relative w-10 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-md`}
        >
          {index + 1 <= 3 && (
            <FaCrown
              className={`absolute -top-3 sm:-top-4 text-3xl font-bold ${getRankStyle(
                index + 1
              )}`}
            />
          )}
          <span
            className={`rank-number-font font-extrabold ${getRankStyle(
              index + 1
            )} ${
              index + 1 <= 3 ? "text-lg sm:text-2xl" : "text-md sm:text-lg"
            }`}
          >
            {index + 1}
          </span>
        </div>
        <img
          src={ranker.profilePicture || "/images/defaultUserImage.png"}
          alt={ranker.fullName || "userImage"}
          className="w-12 h-12 rounded-full border-2 border-slate-700 object-cover hidden sm:inline"
        />
        <div
          onClick={() => navigate(`/profiles/${ranker.userId}`)}
          className="cursor-pointer"
        >
          <h2 className="text-lg font-semibold text-white">
            {ranker.fullName}
          </h2>
          <p className="text-sm text-slate-400">{ranker.headLine}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-blue-400 font-semibold text-md sm:text-lg">
          Score: {ranker[score].toFixed(3)}
        </p>
        <p className="text-slate-500 text-xs rank-number-font">
          Rank #{index + 1}
        </p>
      </div>
    </motion.div>
  );
};

export default Rank;
