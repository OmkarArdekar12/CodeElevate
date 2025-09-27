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
import { logoutUser } from "../service/authApi.js";

const ProfilePage = () => {
  const { id: profileId } = useParams();
  const { isLoggedIn, user, logout } = useSession();
  const userId = user && user.userId ? user.userId : "";
  const isOwner = profileId === userId;

  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    try {
      const { data } = await logoutUser();
      logout(data);
      navigate("/login");
    } catch (err) {
      console.log("Error: ", err.message);
    }
  };

  const fetchUserData = async (id) => {
    try {
      const profileData = await showProfile(profileId);
      setUserData(profileData);
      setLoading(false);
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
        {isLoggedIn && isOwner && (
          <div className="mr-2 ml-auto my-2">
            <button
              className="bg-red-500 text-center rounded-md px-4 py-2 hover-text-border"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
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
