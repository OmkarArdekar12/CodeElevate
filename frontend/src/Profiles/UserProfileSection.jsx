import React from "react";

const UserProfileSection = () => {
  return (
    <>
      <div className="w-full flex items-center justify-center relative">
        <img
          src="/images/bgBannerImage.png"
          alt="backgroundBannerImage"
          className="w-full h-45 md:h-70 rounded-b-2xl object-fill"
        />
      </div>
      <div className="w-full flex flex-col items-center relative -mt-20 z-1 md:flex-row md:pl-20">
        <img
          src="/images/userImage.png"
          alt="userImage"
          className="w-39 h-39 flex items-center justify-center md:w-70 md:h-70 rounded-full border-3 border-white object-cover"
        />
        <div className="flex flex-col justify-center items-center md:items-start mt-10 md:ml-4 text-white text-5xl font-semibold">
          <h1>FullName</h1>
          <h1>@Username</h1>
          <h2 className="mt-1 text-4xl">Headline</h2>
        </div>
      </div>
    </>
  );
};

export default UserProfileSection;
