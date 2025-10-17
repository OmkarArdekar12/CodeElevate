import React, { useState, useEffect } from "react";
import Hero from "./Hero.jsx";
import Logo3D from "../components/Logo3D.jsx";
import Logo3DGold from "../components/Logo3DGold.jsx";
import { AnimatePresence, motion } from "framer-motion";

export default function AboutPage() {
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
    viewAngle == 0 ? [0, 0, 39] : viewAngle == 1 ? [0, 19, 39] : [10, -14, 39];

  return (
    <div className="w-full flex flex-col items-center justify-center text-white pt-14 py-4 px-2 md:px-10 mb-5 transition-all duration-300 ease-in-out">
      <div className="flex justify-start">
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
        <div className="flex-1/2">Goal</div>
      </div>
    </div>
  );
}
