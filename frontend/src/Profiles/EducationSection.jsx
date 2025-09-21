import React, { useState } from "react";
import { FaDotCircle } from "react-icons/fa";

const EducationSection = ({ education }) => {
  if (!education) {
    return null;
  }
  const degree = education.degree;
  const cgpa = education.cgpa;
  const institution = education.institution;
  const isEmpty = degree || cgpa || institution;
  return (
    <>
      {isEmpty && (
        <>
          <div className="w-full flex flex-col justify-center p-4">
            <h2 className="text-3xl mb-1 title-font">Education</h2>
            <div className="flex justify-center flex-col lg:flex-row lg:justify-evenly flex-wrap mt-4 p-4 md:px-25 text-2xl">
              {degree && (
                <p>
                  <FaDotCircle className="inline mr-2 text-gray-600 text-sm" />
                  <span className="italic">Degree:</span> {degree}
                </p>
              )}
              {cgpa && (
                <p>
                  <FaDotCircle className="inline mr-2 text-gray-600 text-sm" />
                  <span className="italic">CGPA:</span> {cgpa.toFixed(2)}
                </p>
              )}
              {institution && (
                <p>
                  <FaDotCircle className="inline mr-2 text-gray-600 text-sm" />
                  <span className="italic">Insitution:</span> {institution}
                </p>
              )}
            </div>
          </div>
          <hr className="w-full text-gray-600 my-10" />
        </>
      )}
    </>
  );
};

export default EducationSection;
