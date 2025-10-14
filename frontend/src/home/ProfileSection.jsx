import { useEffect } from "react";
import Profile from "./Profile.jsx";
import { useState } from "react";
import { allProfiles } from "../service/profileApi.js";
import Loading from "../components/Loading.jsx";

export default function ProfileSection() {
  const [userProfiles, setUserProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllProfiles = async () => {
    try {
      setLoading(true);
      const profiles = await allProfiles();
      // console.log(profiles.data);
      setUserProfiles(profiles.data);
    } catch (err) {
      console.error("Failed to fetch all profiles data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProfiles();
  }, []);

  return (
    <div className="ProfileSection box flex flex-col text-white items-center justify-center w-[95%] p-12 rounded-md m-10 mb-25 border border-slate-500 shadow-sm shadow-gray-500/50 transition-all duration-300 ease-in-out">
      {loading ? (
        <Loading />
      ) : userProfiles.length === 0 ? (
        <p className="text-gray-300 mt-4">No profiles found.</p>
      ) : (
        userProfiles.map((profile) => (
          <Profile key={profile._id} profile={profile} />
        ))
      )}
    </div>
  );
}
