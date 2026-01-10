import React from "react";
import { motion } from "framer-motion";

const StatsFeature = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="w-full flex flex-col md:flex-row items-center px-4 gap-2 py-10 text-gray-200 transition-all duration-300 ease-in-out"
    >
      <div className="flex items-center justify-center w-full md:w-1/2">
        <img
          src="/about/statsSystem.png"
          alt="Stats Feature Image"
          className="w-full about-image transition-transform duration-300 ease-in-out hover:scale-105"
        />
      </div>
      <div className="flex flex-col items-center justify-center w-full md:w-1/2 text-md md:text-xl px-2 md:px-14 gap-3">
        <h2 className="text-xl md:text-3xl font-semibold text-center">
          Stats System
        </h2>
        <p>
          The stats feature in CodeElevate enriches user profiles by showing key
          coding and development platform statistics, specifically from
          LeetCode, Codeforces, and GitHub, if the user provides their
          respective usernames. This feature displays a dedicated stats card on
          the profile, highlighting achievements and activity on these
          platforms, such as problem-solving progress, contest ratings, contest
          rank, global ranking, repositories, and contributions. Designed with
          responsive layouts, these stats cards adapt smoothly to different
          screen sizes, ensuring accessibility on both desktop and mobile
          devices. The user experience is further enhanced by subtle animations
          that make the stats visually engaging without overwhelming the
          interface. Overall, this feature offers coders a concise, dynamic
          snapshot of their coding journey and skills, integrated seamlessly
          within their CodeElevate profile to boost their personal brand and
          community recognition.
        </p>
      </div>
    </motion.div>
  );
};

export default StatsFeature;
