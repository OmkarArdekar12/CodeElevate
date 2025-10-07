import React from "react";

const AboutSection = ({ about }) => {
  if (!about) {
    return null;
  }
  return (
    <>
      {about && (
        <>
          <div className="w-full flex flex-col justify-center p-4">
            <h2 className="text-2xl md:text-3xl mb-3 title-font">About</h2>
            <h3 className="md:text-xl">{about}</h3>
          </div>
          <hr className="w-full text-gray-600 my-10" />
        </>
      )}
    </>
  );
};

export default AboutSection;
