import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleRight } from "@fortawesome/free-solid-svg-icons";
import { TbPointFilled } from "react-icons/tb";

const DomainRoleSection = ({ domain, role }) => {
  if (!domain && !role) {
    return null;
  }
  return (
    <>
      <div className="w-full flex flex-col justify-center p-4">
        <h2 className="text-2xl md:text-3xl mb-3 title-font">Domain & Role</h2>
        <div className="w-full flex items-center flex-wrap">
          {domain && (
            <h3 className="inline-flex flex-wrap items-center bg-indigo-600 px-4 py-2 rounded-full md:text-lg mx-2 my-1 text-center">
              <div className="inline-flex items-center mr-1">
                <TbPointFilled className="text-black inline" />
                <span className="text-black font-semibold">Domain: </span>
              </div>
              <div className="font-semibold hover-text-border">
                {domain.toUpperCase()}
              </div>
            </h3>
          )}
          {role && (
            <h3 className="inline-flex flex-wrap items-center bg-indigo-600 px-4 py-2 rounded-full md:text-lg mx-2 my-1 text-center">
              <div className="inline-flex items-center mr-1">
                <TbPointFilled className="text-black inline" />
                <span className="text-black font-semibold">Role: </span>
              </div>
              <div className="font-semibold hover-text-border">
                {role.toUpperCase()}
              </div>
            </h3>
          )}
        </div>
      </div>
      <hr className="w-full text-gray-600 my-10" />
    </>
  );
};

export default DomainRoleSection;
