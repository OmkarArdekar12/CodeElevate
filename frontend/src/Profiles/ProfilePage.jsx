import React from "react";

const ProfilePage = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center bg-slate-900">
      <div className="w-full flex items-center justify-center relative">
        <img
          src="/images/bgBannerImage.png"
          alt="backgroundBannerImage"
          className="w-full"
        />
      </div>
      <div className="w-full flex items-center justify-center relative -mt-16 z-10">
        <img
          src="/images/userImage.png"
          alt="bannerImage"
          className="flex items-center justify-center w-60 h-60 rounded-full border-3 border-white object-cover box-border"
        />
        <h1 className="ml-4 mt-10 lg:ml-0 lg:mt-4 text-white text-2xl font-semibold">
          Username
        </h1>
      </div>
      <div></div>
    </div>
  );
};

export default ProfilePage;
