import React, { useState, useEffect } from "react";
import Hero from "./Hero.jsx";
import Features from "./Features.jsx";
import Creator from "./Creator.jsx";

export default function AboutPage() {
  return (
    <div className="w-full flex flex-col items-center justify-center text-white pt-14 py-4 px-2 md:px-10 mb-5 transition-all duration-300 ease-in-out">
      <div className="w-full text-2xl sm:text-3xl md:text-5xl flex items-center justify-center hover-text-border text-gray-100 border-b py-5">
        About CodeElevate
      </div>
      <Hero />
      <Features />
      <Creator />
    </div>
  );
}
