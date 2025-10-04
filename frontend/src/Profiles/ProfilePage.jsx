import React, { useEffect, useState } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import { showProfile } from "../service/profileApi.js";
import Loading from "../components/Loading.jsx";
import { useSession } from "../context/SessionContext";

const ProfilePage = () => {
  const { id: profileId } = useParams();
  const { isLoggedIn, user } = useSession();
  const userId = user && user.userId ? user.userId : "";
  const isOwner = profileId === userId;

  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    fullName: "",
    user: {
      _id: userId,
      username: "",
    },
    profilePicture: "",
    backgroundBanner: "",
    headLine: "",
    role: "Explorer",
    domain: "General",
    tags: ["", "", "", "", ""],
    about: "",
    developmentProfiles: {
      github: "",
      gitlab: "",
      portfolio: "",
    },
    competitiveProfiles: {
      leetCode: "",
      codeforces: "",
      atCoder: "",
      codechef: "",
      geeksforgeeks: "",
      hackerrank: "",
    },
    socials: {
      linkedin: "",
      email: "",
      youtube: "",
      discord: "",
      stackoverflow: "",
      facebook: "",
      instagram: "",
      twitterx: "",
      telegram: "",
      others: "",
    },
    showStats: false,
    education: {
      degree: "",
      cgpa: null,
      institution: "",
    },
    followers: [],
    following: [],
  });
  const [loading, setLoading] = useState(false);

  const fetchUserData = async (id) => {
    setLoading(true);
    try {
      const profileData = await showProfile(id);
      setUserData((prev) => ({
        ...prev,
        ...profileData,
        tags: [...profileData.tags],
        socials: { ...prev.socials, ...profileData.socials },
        competitiveProfiles: {
          ...prev.competitiveProfiles,
          ...profileData.competitiveProfiles,
        },
        developmentProfiles: {
          ...prev.developmentProfiles,
          ...profileData.developmentProfiles,
        },
        education: {
          ...prev.education,
          ...profileData.education,
        },
      }));
    } catch (err) {
      console.error("Failed to fetch profile", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData(profileId);
  }, [profileId]);

  if (loading) {
    return <Loading />;
  }

  if (!userData) {
    return <p className="text-center mt-10">Profile not found.</p>;
  }

  const showStats = userData.showStats;

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

        <ButtonSection
          profileUserId={profileId}
          isLoggedIn={isLoggedIn}
          isOwner={isOwner}
          profileUserFullName={userData.fullName}
          followersCount={userData.followers ? userData.followers.length : 0}
          followingCount={userData.following ? userData.following.length : 0}
        />

        <AboutSection about={userData.about} />

        <DomainRoleSection domain={userData.domain} role={userData.role} />

        <TagsSection tags={userData.tags} />

        <CompetitiveProgrammingSection
          codingProfiles={userData.competitiveProfiles}
        />

        {showStats && (
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
        )}

        <DevelopmentSection
          versionControlProfiles={userData.developmentProfiles}
        />

        {showStats && (
          <DevelopmentStatsSection
            github={
              userData.developmentProfiles
                ? userData.developmentProfiles.github
                : ""
            }
          />
        )}

        <EducationSection education={userData.education} />

        <PostsSection />
        <SocialsSection socials={userData.socials} />
      </div>
    </div>
  );
};

export default ProfilePage;
