import React from "react";
import { FaArrowRight, FaUpRightFromSquare } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { IoLogIn } from "react-icons/io5";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="w-full h-full flex justify-center items-center p-4 text-white">
      <div className="flex flex-col">
        <h1 className="text-5xl mb-5 text-red-600 text-border-error">
          Oops! Something went wrong!
        </h1>
        <h2 className="text-3xl text-gray-300 mb-3">
          Sorry for your inconvenience
        </h2>
        <h3 className="text-2xl text-gray-300 mb-10 italic">
          Error 500 - Internal Server Error!
        </h3>
        <Link
          to="/"
          className="text-blue-600 text-xl hover-border-link group flex items-center"
        >
          <FaHome size={30} className="inline mr-3" />
          Go to Home Page{" "}
          <FaUpRightFromSquare
            className="ml-1 hidden group-hover:inline"
            size={15}
          />
        </Link>
        <Link
          to="/login"
          className="text-blue-600 text-xl hover-border-link group flex items-center"
        >
          <IoLogIn size={30} className="inline mr-3" />
          Go to Login Page{" "}
          <FaUpRightFromSquare
            className="ml-1 hidden group-hover:inline"
            size={15}
          />
        </Link>
      </div>
    </div>
  );
};

export default Error;
