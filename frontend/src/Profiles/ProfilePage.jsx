import React from "react";

const ProfilePage = () => {
  return (
    <div className="w-full flex items-center justify-center md:px-10 text-white">
      <div className="w-full flex flex-col items-center justify-center pb-5 bg-[#181818]">
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
          <div className="flex flex-col justify-center items-center md:items-start mt-10 md:ml-4 text-white text-3xl font-semibold">
            <h1>Username</h1>
            <h2 className="mt-1 text-2xl">Headline</h2>
          </div>
        </div>
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
        </div>
        <hr className="w-full text-gray-600 my-4" />
        <div>About</div>
        <div>Domain & Role</div>
        <div>Tags</div>
        <div>CompetitiveProfile</div>
        <div>DevelopmentProfile</div>
        <div>Education</div>
      </div>
    </div>
  );
};

export default ProfilePage;
