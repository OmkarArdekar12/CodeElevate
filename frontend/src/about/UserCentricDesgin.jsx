import React from "react";

const UserCentricDesgin = () => {
  return (
    <div className="w-full flex flex-col md:flex-row items-center px-4 gap-2 py-10 text-gray-200">
      <div className="flex items-center justify-center w-full md:w-1/2">
        <img
          src="/about/accessibility.png"
          alt="Features Image"
          className="w-full"
        />
      </div>
      <div className="flex flex-col items-center justify-center w-full md:w-1/2 text-md md:text-xl px-2 md:px-14 gap-3">
        <h2 className="text-xl md:text-3xl font-semibold text-center">
          User Centric UI Design & Multi-functionality
        </h2>
        <p>
          CodeElevate prioritizes accessibility and user-centric design,
          ensuring all features are both visually engaging and easily usable.
          For profile displays, the UI introduces a vibrant touch, when users
          hover over any profile, an animated border appears, providing
          immediate visual feedback while maintaining clarity for all users.
        </p>
      </div>
    </div>
  );
};

export default UserCentricDesgin;
