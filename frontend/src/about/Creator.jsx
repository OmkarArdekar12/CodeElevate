import React from "react";
import ImageSection from "./ImageSection.jsx";
import ContentSection from "./ContentSection.jsx";

const Creator = () => {
  return (
    <div className="w-full flex flex-col mt-6 justify-center items-center transition-all duration-300 ease-in-out">
      <h1 className="w-full text-center text-xl md:text-5xl border-y py-5 text-gray-100">
        Developer and Creator
      </h1>
      <div className="w-full flex flex-col justify-center items-center gap-3">
        <ImageSection />
        <ContentSection />
      </div>
    </div>
  );
};

export default Creator;
