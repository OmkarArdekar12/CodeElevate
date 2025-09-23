import React, { useState } from "react";
import UserProfileSection from "./UserProfileSection.jsx";
import ButtonSection from "./ButtonSection.jsx";
import AboutSection from "./AboutSection.jsx";
import DomainRoleSection from "./DomainRoleSection.jsx";
import TagsSection from "./TagsSection.jsx";
import CompetitiveProgrammingSection from "./CompetitiveProgrammingSection.jsx";
import CompetitiveProgrammingStatsSection from "./CompetitiveProgrammingStatsSection.jsx";
import DevelopmentSection from "./DevelopmentSection.jsx";
import DevelopmentStatsSection from "./DevelopmentStatsSection.jsx";
import EducationSection from "./EducationSection.jsx";
import SocialsSection from "./SocialsSection.jsx";
import PostsSection from "./PostsSection.jsx";
import { profile } from "./sampleData.js"; //sample data for testing

const ProfilePage = ({ profileId }) => {
  // const [userData, setUserData] = useState({});
  const [userData, setUserData] = useState(profile);

  return (
    <div className="w-full flex items-center justify-center md:px-10 text-white">
      <div className="w-full flex flex-col items-center justify-center pb-5 bg-[#181818]">
        <UserProfileSection
          fullName={userData.fullName}
          username={userData.user.username}
          profilePicture={userData.profilePicture}
          bgBanner={userData.backgroundBanner}
          headLine={userData.headLine}
        />

        <ButtonSection />

        <AboutSection about={userData.about} />

        <DomainRoleSection domain={userData.domain} role={userData.role} />

        <TagsSection tags={userData.tags} />

        <CompetitiveProgrammingSection
          codingProfiles={userData.competitiveProfiles}
        />

        <CompetitiveProgrammingStatsSection
          leetcode={
            userData.competitiveProfiles
              ? userData.competitiveProfiles.leetCode
              : ""
          }
          codeforces={
            userData.competitiveProfiles
              ? userData.competitiveProfiles.codeforces
              : ""
          }
        />

        <DevelopmentSection
          versionControlProfiles={userData.developmentProfiles}
        />

        <DevelopmentStatsSection
          github={
            userData.developmentProfiles
              ? userData.developmentProfiles.github
              : ""
          }
        />

        <EducationSection education={userData.education} />

        <SocialsSection socials={userData.socials} />

        <PostsSection />
      </div>
    </div>
  );
};

export default ProfilePage;
