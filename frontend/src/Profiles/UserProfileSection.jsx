import React from "react";

const UserProfileSection = ({
  fullName,
  username,
  profilePicture,
  bgBanner,
  headLine,
}) => {
  return (
    <>
      <div className="w-full flex items-center justify-center relative">
        <img
          src={bgBanner ? bgBanner : "/images/defaultBgBannerImage.png"}
          alt="backgroundBannerImage"
          className="w-full h-45 md:h-70 rounded-b-2xl object-fill"
        />
      </div>
      <div className="w-full flex flex-wrap flex-col items-center relative -mt-20 z-1 md:flex-row md:pl-20">
        <div className="flex flex-col items-center">
          <img
            src={
              profilePicture ? profilePicture : "/images/defaultUserImage.png"
            }
            alt="userImage"
            className="w-55 h-55 flex items-center justify-center md:w-86 md:h-86 rounded-full border-3 border-white object-cover"
          />
          {username && (
            <h3 className="text-white text-md italic mt-3">@{username}</h3>
          )}
        </div>
        <div className="flex flex-col justify-center text-2xl items-center md:items-start mt-10 md:ml-4 text-white md:text-5xl font-semibold">
          {fullName && <h1>{fullName}</h1>}
          {headLine && (
            <h2 className="mt-1 text-xl md:text-3xl font-sans">{headLine}</h2>
          )}
        </div>
      </div>
    </>
  );
};

export default UserProfileSection;
