import React, { useState, useEffect } from "react";
import Hero from "./Hero.jsx";
import Logo3D from "../components/Logo3D.jsx";
import Logo3DGold from "../components/Logo3DGold.jsx";
import { AnimatePresence, motion } from "framer-motion";

export default function AboutPage() {
  const [showGold, setShowGold] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setShowGold((prev) => !prev), 10000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center text-white pt-14 py-4 px-2 md:px-10 mb-5 transition-all duration-300 ease-in-out">
      <Hero />
      <div className="flex items-center justify-center">
        <AnimatePresence mode="wait" initial={false}>
          {showGold ? (
            <motion.div
              key="gold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
            >
              <Logo3DGold width="648px" height="756px" />
            </motion.div>
          ) : (
            <motion.div
              key="silver"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
            >
              <Logo3D width="648px" height="756px" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
