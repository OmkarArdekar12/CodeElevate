import React from "react";
import { Loader } from "lucide-react";
import { BsThreeDots } from "react-icons/bs";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading = () => {
  return (
    <div className="w-[100%] h-[100%] text-white bg-transparent flex flex-col md:flex-row gap-1 justify-center items-center text-base sm:text-lg md:text-xl lg:text-2xl transition-all duration-200 ease-in-out">
      <Loader className="animate-spin m-1 size-7 sm:size-8 md:size-9 lg:size-11" />
      <span className="flex items-end">
        Loading
        <span className="flex">
          <span className="bg-white dot w-1 h-1 rounded-full mx-0.5 animate-bounce1"></span>
          <span className="bg-white dot w-1 h-1 rounded-full mx-0.5 animate-bounce2"></span>
          <span className="bg-white dot w-1 h-1 rounded-full mx-0.5 animate-bounce3"></span>
        </span>
      </span>
    </div>
  );
};

export default Loading;
