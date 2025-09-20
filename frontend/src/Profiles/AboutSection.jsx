import React from "react";

const AboutSection = ({ about }) => {
  return (
    <>
      {about && (
        <>
          <div className="w-full flex flex-col justify-center p-4">
            <h2 className="text-3xl mb-3 title-font">About</h2>
            <h3 className="text-lg">{about}</h3>
          </div>
          <hr className="w-full text-gray-600 my-10" />
        </>
      )}
    </>
  );
};

export default AboutSection;
