import React from "react";
import { Loader } from "lucide-react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading = () => {
  return (
    <div className="w-[100%] h-[100%] text-white bg-transparent flex justify-center items-center text-2xl transition-all duration-200 ease-in-out">
      <Loader className="animate-spin m-1" size={45} />
      Loading...
    </div>
  );
};

export default Loading;
