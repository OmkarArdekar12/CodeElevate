import React, { useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { TbPoint } from "react-icons/tb";
import { MdCastForEducation } from "react-icons/md";

const EducationSection = ({ education }) => {
  if (!education) {
    return null;
  }
  const degree = education.degree;
  const cgpa = education.cgpa ? education.cgpa.toFixed(2) : "";
  const institution = education.institution;
  const isEmpty = degree || cgpa || institution;
  return (
    <>
      {isEmpty && (
        <>
          <div className="w-full flex flex-col justify-center p-4 transition-all duration-300 ease-in-out">
            <h2 className="text-2xl md:text-3xl mb-1 title-font">Education</h2>
            <div className="flex items-start gap-1 justify-start mt-4 p-4 md:px-25 text-xl md:text-2xl">
              <div>
                <MdCastForEducation className="inline text-gray-200 text-sm" />
              </div>
              <div className="flex items-start gap-0 flex-col flex-wrap text-xl md:text-2xl">
                {degree && (
                  <p className="inline-flex items-center leading-none">
                    <span className="font-light text-xl md:text-2xl">
                      Degree: {degree}
                    </span>
                  </p>
                )}
                {cgpa && (
                  <p className="inline-flex items-center leading-none">
                    <span className="font-light text-xl md:text-2xl">
                      CGPA: {cgpa}
                    </span>
                  </p>
                )}
                {institution && (
                  <p className="inline-flex items-center leading-none">
                    <span className="font-light text-xl md:text-2xl">
                      Insitution: {institution}
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>
          <hr className="w-full text-gray-600 my-10" />
        </>
      )}
    </>
  );
};

export default EducationSection;
