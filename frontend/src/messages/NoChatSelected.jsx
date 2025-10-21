import React from "react";
import { FaMessage } from "react-icons/fa6";

const NoChatSelected = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-16 transition-all duration-300 ease-in-out">
      <div className="w-full text-center space-y-6">
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="relative w-16 h-16 rounded-2xl flex items-center justify-center animate-bounce"
              style={{ animationTimingFunction: "ease" }}
            >
              <div className="absolute flex items-center gap-1">
                <p
                  className="rounded-full bg-white size-1 z-90 animate-bounce-small"
                  style={{
                    animationDelay: "0s",
                    animationDuration: "2s",
                    animationTimingFunction: "ease-in-out",
                  }}
                ></p>
                <p
                  className="rounded-full bg-white size-1 z-90 animate-bounce-medium"
                  style={{
                    animationDelay: "0.2s",
                    animationDuration: "2s",
                    animationTimingFunction: "ease-in-out",
                  }}
                ></p>
                <p
                  className="rounded-full bg-white size-1 z-90 animate-bounce-large"
                  style={{
                    animationDelay: "0.3s",
                    animationDuration: "2s",
                    animationTimingFunction: "ease-in-out",
                  }}
                ></p>
              </div>
              <FaMessage className="size-14 md:size-19 text-gray-950 msg-logo" />
            </div>
          </div>
        </div>
        <p className="text-base-content/60">
          Select a conversation from the sidebar to start messaging...
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
