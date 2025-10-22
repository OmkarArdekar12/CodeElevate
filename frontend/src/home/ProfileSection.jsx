import { useState, useEffect } from "react";
import Profile from "./Profile.jsx";
import Loading from "../components/Loading.jsx";

export default function ProfileSection({ userProfiles, loading }) {
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
