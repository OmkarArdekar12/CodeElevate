import React from "react";
import ImageSection from "./ImageSection.jsx";
import ContentSection from "./ContentSection.jsx";

const Features = () => {
  return (
    <div className="w-full flex flex-col mt-2 justify-center items-center transition-all duration-300 ease-in-out">
      <h1 className="text-md md:text-3xl">Features</h1>
      <div className="w-full flex flex-col justify-center items-center">
        <div className="w-full flex items-center">
          <ImageSection />
          <ContentSection />
        </div>
      </div>
    </div>
  );
};

export default Features;
