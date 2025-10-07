import React from "react";
import { Loader2 } from "lucide-react";

const Loading2 = ({ text = "Loading" }) => {
  return (
    <div className="w-[100%] h-[100%] text-white bg-transparent flex justify-center items-center transition-all duration-200 ease-in-out">
      <Loader2 className="animate-spin m-1" size={20} />
      {text}
    </div>
  );
};

export default Loading2;
