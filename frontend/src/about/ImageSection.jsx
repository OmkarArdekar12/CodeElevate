import React from "react";
import { motion } from "framer-motion";

const ImageSection = () => {
  return (
    <div className="w-full flex items-center justify-center p-5 rounded-full">
      <motion.img
        src="/about/creator.png"
        alt="Omkar Ardekar"
        initial={{ opacity: 0, rotateY: 0 }}
        whileInView={{ opacity: 1, rotateY: 1080 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="size-75 rounded-full"
        style={{ transformStyle: "preserve-3d" }}
      />
    </div>
  );
};

export default ImageSection;
