import React, { useState, useEffect } from "react";
import Logo3D from "../components/Logo3D.jsx";
import Logo3DGold from "../components/Logo3DGold.jsx";
import { AnimatePresence, motion } from "framer-motion";

const Hero = () => {
  const [showGold, setShowGold] = useState(false);
  const [viewAngle, setViewAngle] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setShowGold((prev) => !prev);
      setViewAngle((prev) => (prev + 1) % 3);
    }, 10000);
    return () => clearInterval(id);
  }, []);

  const currCameraPosition =
    viewAngle === 0
      ? [0, 0, 39]
      : viewAngle === 1
      ? [0, 19, 39]
      : [10, -14, 39];

  return (
    <div className="w-full flex flex-col lg:flex-row items-center transition-all duration-300 ease-in-out">
      <div className="p-0 m-0">
        <AnimatePresence mode="wait" initial={false}>
          {showGold ? (
            <motion.div
              key="gold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
            >
              <Logo3DGold cameraPosition={currCameraPosition} />
            </motion.div>
          ) : (
            <motion.div
              key="silver"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
            >
              <Logo3D cameraPosition={currCameraPosition} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="text-cyan-100 flex gap-1 items-center justify-center flex-col px-4 md:px-10 selection:bg-yellow-300 selection:text-black">
        <h1 className="text-2xl sm:text-3xl lg:text-5xl py-4 hover-text-border">
          Our Vision
        </h1>
        <motion.div
          initial={{ opacity: 0, x: 200, y: 100 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            delay: 0.5,
            ease: "linear",
          }}
          className="text-sm sm:text-md lg:text-lg tracking-widest about-font hover-text-border"
        >
          <h2 className="my-1 about-font">
            CodeElevate empowers users to showcase their coding and development
            profiles all in one place. It provides a unified platform where
            learners, competitive programmers, coders and developers can
            analyze, track, and elevate their progress in both competitive
            programming and software development.
          </h2>
          <h2 className="my-1 about-font">
            Users can compete, connect, and grow together by earning ranks
            across multiple categories, building meaningful connections, and
            engaging through connection and messaging features.
          </h2>
          <h2 className="my-1 about-font">
            At CodeElevate, our goal is to inspire growth, celebrate
            achievement, and create a community where every coder can rise to
            their full potential.
          </h2>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
