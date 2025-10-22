import React from "react";

const ChatSkeleton = () => {
  const skeletonChats = Array(9).fill(null);
  return (
    <div className="flex-1 p-4 overflow-y-auto transition-all duration-300 ease-in-out">
      {skeletonChats.map((_, i) => (
        <div
          key={i}
          className={`flex ${
            (i + 1) % 2 == 0 ? "justify-end" : "justify-start"
          } mb-2`}
        >
          <div
            className={`w-30 h-14 md:w-75 md:h-20 px-5 py-2 rounded-2xl shadow bg-gray-800 animate-pulse  ${
              (i + 1) % 2 == 0 ? "rounded-br-none" : "rounded-bl-none"
            }`}
          >
            <p
              className={`text-xs mt-1 opacity-70 ${
                (i + 1) % 2 == 0 ? "text-right" : "text-left"
              }`}
            ></p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatSkeleton;
