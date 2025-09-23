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
      const profiles = await allProfiles();
      // console.log(profiles.data);
      setUserProfiles(profiles.data);
    } catch (err) {
      console.error("Failed to fetch all profiles data", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAllProfiles();
  }, []);

  return (
    <div className="ProfileSection box flex flex-col text-white items-center justify-center w-[95%] p-12 rounded-md m-10 mb-25 border border-slate-500 shadow-sm shadow-gray-500/50">
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

//Testing Data
// const users = [
//   {
//     id: 1,
//     image: "/images/userImage.png",
//     name: "Sample Username",
//     role: "Student",
//     domain: "Competitive Programmer",
//   },
//   {
//     id: 2,
//     image: "/images/userImage.png",
//     name: "Sample Username",
//     role: "Professional",
//     domain: "Developer",
//   },
//   {
//     id: 3,
//     image: "/images/userImage.png",
//     name: "Sample Username",
//     role: "Student",
//     domain: "Web Developer",
//   },
//   {
//     id: 4,
//     image: "/images/userImage.png",
//     name: "Sample Username",
//     role: "Professional",
//     domain: "Coder",
//   },
//   {
//     id: 5,
//     image: "/images/userImage.png",
//     name: "Sample Username",
//     role: "Student",
//     domain: "Competitive Programmer",
//   },
//   {
//     id: 6,
//     image: "/images/userImage.png",
//     name: "Sample Username",
//     role: "Professional",
//     domain: "Developer",
//   },
//   {
//     id: 7,
//     image: "/images/userImage.png",
//     name: "Sample Username",
//     role: "Student",
//     domain: "Web Developer",
//   },
//   {
//     id: 8,
//     image: "/images/userImage.png",
//     name: "Sample Username",
//     role: "Professional",
//     domain: "Coder",
//   },
//   {
//     id: 9,
//     image: "/images/userImage.png",
//     name: "Sample Username",
//     role: "Student",
//     domain: "Competitive Programmer",
//   },
// ];
