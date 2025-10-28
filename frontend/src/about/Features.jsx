import React from "react";
import ImageSection from "./ImageSection.jsx";
import ContentSection from "./ContentSection.jsx";
import AuthenticationFeature from "./AuthenticationFeature.jsx";
import UserCentricDesgin from "./UserCentricDesgin.jsx";
import SearchAndFilterSearchFunctionalityFeature from "./SearchAndFilterSearchFunctionalityFeature.jsx";
import ProfileOptions from "./ProfileOptions.jsx";
import PostingFeature from "./PostingFeature.jsx";

const Features = () => {
  return (
    <div className="w-full flex flex-col mt-6 justify-center items-center transition-all duration-300 ease-in-out">
      <h1 className="w-full text-center text-xl md:text-5xl border-y py-5 text-gray-100">
        Features
      </h1>
      <div className="w-full flex flex-col justify-center items-center gap-1">
        <AuthenticationFeature />
        <UserCentricDesgin />
        <SearchAndFilterSearchFunctionalityFeature />
        <ProfileOptions />
        <PostingFeature />
      </div>
    </div>
  );
};

export default Features;
