import React from "react";

const ButtonSection = () => {
  return (
    <>
      <div className="w-full mt-10 inline-flex flex-wrap items-center justify-center md:justify-start md:pl-25">
        <button className="bg-blue-500 py-2 px-4 m-1 rounded-md hover:text-white hover:border-1 hover-text-border hover:bg-gradient-to-r hover:from-blue-500 hover:via-blue-600 hover:to-blue-700">
          Follow
        </button>
        <button className="bg-blue-500 py-2 px-4 m-1 rounded-md hover:text-white hover:border-1 hover-text-border hover:bg-gradient-to-r hover:from-blue-500 hover:via-blue-600 hover:to-blue-700">
          Following
        </button>
        <button className="bg-blue-500 py-2 px-4 m-1 rounded-md hover:text-white hover:border-1 hover-text-border hover:bg-gradient-to-r hover:from-blue-500 hover:via-blue-600 hover:to-blue-700">
          Connect
        </button>
        <button className="bg-blue-500 py-2 px-4 m-1 rounded-md hover:text-white hover:border-1 hover-text-border hover:bg-gradient-to-r hover:from-blue-500 hover:via-blue-600 hover:to-blue-700">
          Message
        </button>
      </div>
      <hr className="w-full text-gray-600 mt-25 mb-10" />
    </>
  );
};

export default ButtonSection;
