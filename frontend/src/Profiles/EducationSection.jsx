import React, { useState } from "react";
import { FaDotCircle } from "react-icons/fa";

const EducationSection = () => {
  const [userEducation, setUserEducation] = useState({
    degree: "B.Tech",
    cgpa: 9.98999999,
    institution: "IIT Bombay",
  });
  return (
    <div className="w-full flex flex-col justify-center p-4">
      <h2 className="text-3xl mb-1 title-font">Education</h2>
      <div className="flex justify-center flex-col lg:flex-row lg:justify-evenly flex-wrap mt-4 p-4 md:px-25 text-2xl">
        {userEducation.degree && (
          <p>
            <FaDotCircle className="inline mr-2 text-gray-600 text-sm" />
            <span className="italic">Degree:</span> {userEducation.degree}
          </p>
        )}
        {userEducation.cgpa && (
          <p>
            <FaDotCircle className="inline mr-2 text-gray-600 text-sm" />
            <span className="italic">CGPA:</span>{" "}
            {userEducation.cgpa.toFixed(2)}
          </p>
        )}
        {userEducation.institution && (
          <p>
            <FaDotCircle className="inline mr-2 text-gray-600 text-sm" />
            <span className="italic">Insitution:</span>{" "}
            {userEducation.institution}
          </p>
        )}
      </div>
    </div>
  );
};

export default EducationSection;
