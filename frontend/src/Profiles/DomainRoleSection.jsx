import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleRight } from "@fortawesome/free-solid-svg-icons";

const DomainRoleSection = ({ domain, role }) => {
  return (
    <>
      <div className="w-full flex flex-col justify-center p-4">
        <h2 className="text-3xl mb-3 title-font">Domain & Role</h2>
        <div className="w-full flex items-center flex-wrap">
          {role && (
            <h3 className="bg-indigo-500 inline px-4 py-2 rounded-lg text-lg mx-2 my-1 hover-text-border text-center">
              <FontAwesomeIcon
                icon={faCircleRight}
                className="text-black mr-1"
              />
              <span className="italic">Role</span>:{" "}
              <span className="font-bold">{role.toUpperCase()}</span>
            </h3>
          )}
          {domain && (
            <h3 className="bg-teal-500 inline px-4 py-2 rounded-lg text-lg mx-2 my-1 hover-text-border text-center align-middle">
              <FontAwesomeIcon
                icon={faCircleRight}
                className="text-black mr-1"
              />
              <span className="italic">Domain:</span>{" "}
              <span className="font-bold">{domain.toUpperCase()}</span>
            </h3>
          )}
        </div>
      </div>
      <hr className="w-full text-gray-600 my-10" />
    </>
  );
};

export default DomainRoleSection;
