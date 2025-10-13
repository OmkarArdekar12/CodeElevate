// import RankingList from "./RankingList.jsx";
// import { motion } from "framer-motion";
// import { FaMedal } from "react-icons/fa";

// export default function RankingPage() {
//   const medalColors = ["text-yellow-400", "text-gray-300", "text-amber-600"];
//   const ringGradients = [
//     "from-yellow-300 via-amber-400 to-orange-600",
//     "from-gray-300 via-gray-400 to-gray-600",
//     "from-amber-400 via-orange-500 to-red-600",
//   ];
//   const index = 3;
//   return (
//     <div className="w-full flex flex-col items-center justify-center text-white py-4 px-2 md:px-10 mb-5 transition-all duration-300 ease-in-out">
//       <div className="w-full flex">
//         <h1 className="text-3xl hover-text-border text-gray-100">
//           All Rankings Leaderboard
//         </h1>
//         <motion.div
//           key={index}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: index * 0.05 }}
//           whileHover={{
//             scale: 1.03,
//             boxShadow: "0 0 25px rgba(255,255,255,0.15)",
//           }}
//           className="flex items-center justify-between bg-slate-800/60 p-4 rounded-2xl border border-slate-700 hover:border-yellow-400 transition-all duration-300"
//         >
//           {/* 🌸 Rank Badge */}
//           <motion.div
//             className={`relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${
//               ringGradients[index] || "from-blue-400 via-cyan-500 to-blue-700"
//             } p-[2px] shadow-lg shadow-yellow-500/20`}
//             animate={{
//               rotate: [0, 360],
//             }}
//             transition={{
//               duration: 8,
//               repeat: Infinity,
//               ease: "linear",
//             }}
//           >
//             <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
//               <span className="text-3xl font-extrabold bg-gradient-to-tr from-yellow-200 via-orange-400 to-yellow-600 text-transparent bg-clip-text drop-shadow-[0_0_10px_rgba(255,200,0,0.5)]">
//                 {index + 1}
//               </span>
//             </div>
//           </motion.div>

//           {/* User Info */}
//           <div className="flex items-center space-x-4">
//             <img
//               src={"/images/userImage.png"}
//               alt={"omkar"}
//               className="w-12 h-12 rounded-full border-2 border-yellow-400 object-cover"
//             />
//             <div>
//               <p className="text-lg font-semibold">{"omkar"}</p>
//               <p className="text-sm text-gray-400">@{"alice"}</p>
//             </div>
//           </div>

//           {/* Points */}
//           <div className="text-yellow-400 font-bold text-lg">{1000} pts</div>
//         </motion.div>
//       </div>
//       <RankingList />
//     </div>
//   );
// }

import React from "react";
import { motion } from "framer-motion";
import { FaCrown } from "react-icons/fa";

const rankers = [
  {
    id: 1,
    name: "Omkar Patil",
    image: "/images/defaultUserImage.png",
    rank: 1,
  },
  {
    id: 2,
    name: "Aarav Sharma",
    image: "/images/defaultUserImage.png",
    rank: 2,
  },
  {
    id: 3,
    name: "Priya Mehta",
    image: "/images/defaultUserImage.png",
    rank: 3,
  },
  {
    id: 4,
    name: "Rohan Gupta",
    image: "/images/defaultUserImage.png",
    rank: 4,
  },
  {
    id: 5,
    name: "Ananya Verma",
    image: "/images/defaultUserImage.png",
    rank: 5,
  },
];

const getRankStyle = (rank) => {
  switch (rank) {
    case 1:
      return "bg-gradient-to-tr from-yellow-400 to-yellow-600 text-slate-900";
    case 2:
      return "bg-gradient-to-tr from-gray-300 to-gray-500 text-slate-900";
    case 3:
      return "bg-gradient-to-tr from-amber-500 to-amber-700 text-slate-900";
    default:
      return "bg-gradient-to-tr from-slate-600 to-slate-800 text-white";
  }
};

const Rankings = () => {
  return (
    <div className="min-h-screen w-full bg-slate-950 flex flex-col items-center py-14 px-5">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-white mb-10 tracking-wide"
      >
        <span className="text-blue-400">Top </span>Performers
      </motion.h1>

      <div className="w-full flex flex-col gap-5">
        {rankers.map((ranker) => (
          <motion.div
            key={ranker.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: ranker.rank * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="relative w-full flex items-center justify-between bg-slate-900/70 backdrop-blur-xl rounded-2xl px-6 py-5 shadow-lg hover:shadow-blue-600/30 border border-slate-800 transition-all"
          >
            {/* Left Section */}
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

            {/* Right Section */}
            <div className="text-right">
              <p className="text-blue-400 font-semibold">
                Score: {1000 - ranker.rank * 45}
              </p>
              <p className="text-slate-500 text-sm">Rank #{ranker.rank}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Rankings;
