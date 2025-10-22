import { useState, useEffect } from "react";
import Hero from "./Hero.jsx";
import ProfileSection from "./ProfileSection.jsx";
import SearchSection from "./SearchSection.jsx";
import { allProfiles } from "../service/profileApi.js";

export default function Home() {
  const [userProfiles, setUserProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProfiles, setFilteredProfiles] = useState(null);

  const fetchAllProfiles = async () => {
    try {
      setLoading(true);
      const profiles = await allProfiles();
      setUserProfiles(profiles.data);
    } catch (err) {
      setUserProfiles([]);
      //console.error("Failed to fetch all profiles data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProfiles();
  }, []);

  const profiles = filteredProfiles == null ? userProfiles : filteredProfiles;

  return (
    <>
      <Hero />
      <SearchSection
        userProfiles={userProfiles}
        setFilteredProfiles={setFilteredProfiles}
      />
      <ProfileSection userProfiles={profiles} loading={loading} />
    </>
  );
}
