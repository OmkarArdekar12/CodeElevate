import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FaMedal } from "react-icons/fa";
import RankingList from "./RankingList.jsx";
import { getAllRankings } from "../service/rankingApi.js";
import Loading from "../components/Loading.jsx";
import SelectRank from "./SelectRank.jsx";

const rankingsDetails = {
  allRounders: { name: "All Rounders", score: "allRoundersScore" },
  competitiveProgramming: { name: "Competitive Programmers", score: "cpScore" },
  development: { name: "Developers", score: "devScore" },
  contributors: { name: "Contributors", score: "contributorScore" },
  rankers: { name: "Rankers", score: "rankerScore" },
};

export default function RankingPage() {
  const [allRankings, setAllRankings] = useState({});
  const [selectRank, setSelectRank] = useState("allRounders");
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const fetchAllRankings = async () => {
    setLoading(true);
    try {
      const allRankingsData = await getAllRankings();
      setAllRankings(allRankingsData);
    } catch (err) {
      console.log("Error in fetching all rankings data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllRankings();
  }, []);

  useEffect(() => {
    if (location.state?.selectedRank) {
      setSelectRank(location.state.selectedRank);
    }
  }, [location.state]);

  useEffect(() => {
    if (allRankings[selectRank]) {
      setRankings(allRankings[selectRank]);
    }
  }, [selectRank, allRankings]);

  const changeRankings = (e) => {
    setSelectRank(e.target.value);
    if (allRankings[e.target.value]) {
      setRankings(allRankings[e.target.value]);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-full flex flex-col items-center justify-center text-white py-4 px-2 md:px-10 mb-5 transition-all duration-300 ease-in-out">
      <div className="w-full flex">
        <h1 className="text-3xl hover-text-border text-gray-100">Rankings</h1>
      </div>
      <div className="w-full flex items-center justify-end pt-3 pr-1">
        <SelectRank
          selectRank={selectRank}
          changeRankings={changeRankings}
          rankingsDetails={rankingsDetails}
        />
      </div>
      {rankings && rankings.length > 0 ? (
        <RankingList
          rankings={rankings}
          rankName={rankingsDetails[selectRank].name}
          score={rankingsDetails[selectRank].score}
          key={selectRank}
        />
      ) : (
        <div className="flex items-center justify-center text-gray-300 pt-5">
          No rankings found.
        </div>
      )}
    </div>
  );
}

// import React from "react";
// import { motion } from "framer-motion";
// import { FaCrown } from "react-icons/fa";

// const rankers = [
//   {
//     id: 1,
//     name: "Omkar Patil",
//     image: "/images/defaultUserImage.png",
//     rank: 1,
//   },
//   {
//     id: 2,
//     name: "Aarav Sharma",
//     image: "/images/defaultUserImage.png",
//     rank: 2,
//   },
//   {
//     id: 3,
//     name: "Priya Mehta",
//     image: "/images/defaultUserImage.png",
//     rank: 3,
//   },
//   {
//     id: 4,
//     name: "Rohan Gupta",
//     image: "/images/defaultUserImage.png",
//     rank: 4,
//   },
//   {
//     id: 5,
//     name: "Ananya Verma",
//     image: "/images/defaultUserImage.png",
//     rank: 5,
//   },
// ];

// const getRankStyle = (rank) => {
//   switch (rank) {
//     case 1:
//       return "bg-gradient-to-tr from-yellow-400 to-yellow-600 text-slate-900";
//     case 2:
//       return "bg-gradient-to-tr from-gray-300 to-gray-500 text-slate-900";
//     case 3:
//       return "bg-gradient-to-tr from-amber-500 to-amber-700 text-slate-900";
//     default:
//       return "bg-gradient-to-tr from-slate-600 to-slate-800 text-white";
//   }
// };

// const Rankings = () => {
//   return (
//     <div className="min-h-screen w-full bg-slate-950 flex flex-col items-center py-14 px-5">
//       <motion.h1
//         initial={{ opacity: 0, y: -30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="text-4xl font-bold text-white mb-10 tracking-wide"
//       >
//         <span className="text-blue-400">Top </span>Performers
//       </motion.h1>

//       <div className="w-full flex flex-col gap-5">
//         {rankers.map((ranker) => (
//           <motion.div
//             key={ranker.id}
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.4, delay: ranker.rank * 0.1 }}
//             whileHover={{ scale: 1.02 }}
//             className="relative w-full flex items-center justify-between bg-slate-900/70 backdrop-blur-xl rounded-2xl px-6 py-5 shadow-lg hover:shadow-blue-600/30 border border-slate-800 transition-all"
//           >
//             {/* Left Section */}
//             <div className="flex items-center gap-4">
//               <div
//                 className={`relative w-13 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-md ${getRankStyle(
//                   ranker.rank
//                 )}`}
//               >
//                 {ranker.rank <= 3 && (
//                   <FaCrown
//                     className={`absolute -top-3 text-3xl ${
//                       ranker.rank === 1
//                         ? "text-yellow-300"
//                         : ranker.rank === 2
//                         ? "text-gray-200"
//                         : "text-amber-600"
//                     }`}
//                   />
//                 )}
//                 {ranker.rank}
//               </div>
//               <img
//                 src={ranker.image}
//                 alt={ranker.name}
//                 className="w-12 h-12 rounded-full border-2 border-slate-700 object-cover"
//               />
//               <div>
//                 <h2 className="text-lg font-semibold text-white">
//                   {ranker.name}
//                 </h2>
//                 <p className="text-sm text-slate-400">Software Engineer</p>
//               </div>
//             </div>

//             {/* Right Section */}
//             <div className="text-right">
//               <p className="text-blue-400 font-semibold">
//                 Score: {1000 - ranker.rank * 45}
//               </p>
//               <p className="text-slate-500 text-sm">Rank #{ranker.rank}</p>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Rankings;
