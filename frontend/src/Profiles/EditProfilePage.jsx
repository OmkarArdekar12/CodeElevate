import React, { useState } from "react";

const EditProfilePage = () => {
  const [profile, setProfile] = useState({
    fullName: "Omkar Prakash Ardekar",
    user: {
      username: "Omkar",
    },
    profilePicture: "",
    backgroundBanner: "",

    headLine: "Greatest of All Time",

    role: "Software Engineer",
    domain: "Java",

    tags: ["CP", "Coder", "Developer"],

    about: "I am SDE at Google.",

    developmentProfiles: {
      github: "username",
      gitlab: "username",
      portfolio: "username",
    },
    competitiveProfiles: {
      leetCode: "username",
      codeforces: "username",
      atCoder: "username",
      codechef: "username",
      geeksforgeeks: "username",
      hackerrank: "username",
    },
    socials: {
      linkedin: "username",
      email: "username",
      youtube: "username",
      discord: "username",
      stackoverflow: "username",
      facebook: "username",
      instagram: "username",
      twitterx: "username",
      telegram: "username",
      others: "username",
    },

    showStats: true,

    education: {
      degree: "B.Tech",
      cgpa: 9.99,
      institution: "IIT Bombay",
    },

    followers: [],
    following: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (section, field, value) => {
    setProfile((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  return (
    <div className="w-full flex items-center justify-center md:px-10 text-white">
      <div className="w-full flex flex-col items-center justify-center py-5 px-1 bg-[#181818]">
        <form className="w-[95%] bg-gradient-to-r from-gray-800 via-black-900 to-purple-900 rounded-2xl shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-3">Edit Profile</h1>
          {/* <hr className="w-full text-gray-900 mb-5" /> */}
          <hr className="w-full text-white my-5 mb-10" />

          {/* Basic Info */}
          <div className="w-full flex flex-wrap items-center mb-2">
            <div className="m-1">
              <label htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                type="text"
                placeholder="Enter your Full Name"
                name="fullName"
                value={profile.fullName || ""}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-900 text-white"
              />
            </div>
            <div className="m-1">
              <label htmlFor="username">Username</label>
              <input
                disabled
                id="username"
                type="text"
                placeholder="Enter your Username"
                name="username"
                value={"@ " + profile.user.username || ""}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-900 text-gray-300 italic"
              />
            </div>
          </div>
          <div className="m-1 mb-2">
            <label htmlFor="headline">Headline</label>
            <input
              id="headline"
              type="text"
              placeholder="Add some Headline that represents you"
              name="headLine"
              value={profile.headLine || ""}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-900 text-white"
            />
          </div>
          <div className="m-1 mb-2">
            <label htmlFor="about">About</label>
            <textarea
              id="about"
              placeholder="Tell About yourself"
              name="about"
              value={profile.about || ""}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-900 text-white"
            />
          </div>
          <div className="flex flex-wrap mb-5">
            <div className="m-1">
              <label htmlFor="role">Role</label>
              <input
                id="role"
                type="text"
                placeholder="Enter your Role in your field"
                name="role"
                value={profile.role || ""}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-900 text-white"
              />
            </div>
            <div className="m-1">
              <label htmlFor="domain">Domain</label>
              <input
                id="domain"
                type="text"
                placeholder="Enter your Domain in your field"
                name="domain"
                value={profile.domain || ""}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-900 text-white"
              />
            </div>
          </div>
          <hr className="w-full text-white my-5 mb-10" />

          {/* Socials */}
          <div className="m-1 mb-5">
            <h2 className="text-xl font-semibold">Social Links</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              <div>
                <label htmlFor="linkedin">Linkedin</label>
                <input
                  id="linkedin"
                  type="text"
                  placeholder="Enter your Linkedin URL"
                  value={profile.socials.linkedin || ""}
                  //   onChange={}
                  className="w-full p-2 rounded bg-gray-900 text-white"
                />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="text"
                  placeholder="Enter your Email ID"
                  value={profile.socials.email || ""}
                  //   onChange={}
                  className="w-full p-2 rounded bg-gray-900 text-white"
                />
              </div>
              <div>
                <label htmlFor="youtube">YouTube</label>
                <input
                  id="youtube"
                  type="text"
                  placeholder="Enter your YouTube URL"
                  value={profile.socials.youtube || ""}
                  //   onChange={}
                  className="w-full p-2 rounded bg-gray-900 text-white"
                />
              </div>
              <div>
                <label htmlFor="discord">Discord</label>
                <input
                  id="discord"
                  type="text"
                  placeholder="Enter your Discord URL"
                  value={profile.socials.discord || ""}
                  //   onChange={}
                  className="w-full p-2 rounded bg-gray-900 text-white"
                />
              </div>
              <div>
                <label htmlFor="stackoverflow">StackOverFlow</label>
                <input
                  id="stackoverflow"
                  placeholder="Enter your StackOverFlow URL"
                  type="text"
                  value={profile.socials.stackoverflow || ""}
                  //   onChange={}
                  className="w-full p-2 rounded bg-gray-900 text-white"
                />
              </div>
              <div>
                <label htmlFor="facebook">Facebook</label>
                <input
                  id="facebook"
                  type="text"
                  placeholder="Enter your Facebook URL"
                  value={profile.socials.facebook || ""}
                  //   onChange={}
                  className="w-full p-2 rounded bg-gray-900 text-white"
                />
              </div>
              <div>
                <label htmlFor="instagram">Instagram</label>
                <input
                  id="instagram"
                  type="text"
                  placeholder="Enter your Instagram URL"
                  value={profile.socials.instagram || ""}
                  //   onChange={}
                  className="w-full p-2 rounded bg-gray-900 text-white"
                />
              </div>
              <div>
                <label htmlFor="twitterx">X / Twitter</label>
                <input
                  id="twitterx"
                  type="text"
                  placeholder="Enter your X or Twitter URL"
                  value={profile.socials.twitterx || ""}
                  //   onChange={}
                  className="w-full p-2 rounded bg-gray-900 text-white"
                />
              </div>
              <div>
                <label htmlFor="telegram">Telegram</label>
                <input
                  id="telegram"
                  type="text"
                  placeholder="Enter your Telegram URL"
                  value={profile.socials.telegram || ""}
                  //   onChange={}
                  className="w-full p-2 rounded bg-gray-900 text-white"
                />
              </div>
              <div>
                <label htmlFor="others">Others</label>
                <input
                  id="others"
                  type="text"
                  placeholder="Enter your Others/Website URL"
                  value={profile.socials.others || ""}
                  //   onChange={}
                  className="w-full p-2 rounded bg-gray-900 text-white"
                />
              </div>
            </div>
          </div>
          <hr className="w-full text-white my-5 mb-10" />

          {/* Development Profiles */}
          <div className="m-1 mb-5">
            <h2 className="text-xl font-semibold">Development Profiles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              <div>
                <label htmlFor="github">GitHub</label>
                <input
                  id="github"
                  type="text"
                  placeholder="Enter your GitHub Username"
                  value={profile.developmentProfiles.github || ""}
                  //   onChange={}
                  className="w-full p-2 rounded bg-gray-900 text-white"
                />
              </div>
              <div>
                <label htmlFor="gitlab">GitLab</label>
                <input
                  id="gitlab"
                  type="text"
                  placeholder="Enter your GitLab Username"
                  value={profile.developmentProfiles.gitlab || ""}
                  //   onChange={}
                  className="w-full p-2 rounded bg-gray-900 text-white"
                />
              </div>
              <div>
                <label htmlFor="portfolio">Portfolio</label>
                <input
                  id="portfolio"
                  type="text"
                  placeholder="Enter your Portfolio URL"
                  value={profile.developmentProfiles.portfolio || ""}
                  //   onChange={}
                  className="w-full p-2 rounded bg-gray-900 text-white"
                />
              </div>
            </div>
          </div>
          <hr className="w-full text-white my-5 mb-10" />

          {/* Competitive Profiles */}
          <div className="m-1 mb-5">
            <h2 className="text-xl font-semibold">Competitive Profiles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              <div>
                <label htmlFor="leetCode">LeetCode</label>
                <input
                  id="leetCode"
                  type="text"
                  placeholder="Enter your LeetCode Username"
                  value={profile.competitiveProfiles.leetCode || ""}
                  //   onChange={}
                  className="w-full p-2 rounded bg-gray-900 text-white"
                />
              </div>
              <div>
                <label htmlFor="codeforces">Codeforces</label>
                <input
                  id="codeforces"
                  type="text"
                  placeholder="Enter your Codeforces Username"
                  value={profile.competitiveProfiles.codeforces || ""}
                  //   onChange={}
                  className="w-full p-2 rounded bg-gray-900 text-white"
                />
              </div>
              <div>
                <label htmlFor="atCoder">AtCoder</label>
                <input
                  id="atCoder"
                  type="text"
                  placeholder="Enter your AtCoder Username"
                  value={profile.competitiveProfiles.atCoder || ""}
                  //   onChange={}
                  className="w-full p-2 rounded bg-gray-900 text-white"
                />
              </div>
              <div>
                <label htmlFor="codechef">CodeChef</label>
                <input
                  id="codechef"
                  type="text"
                  placeholder="Enter your CodeChef Username"
                  value={profile.competitiveProfiles.codechef || ""}
                  //   onChange={}
                  className="w-full p-2 rounded bg-gray-900 text-white"
                />
              </div>
              <div>
                <label htmlFor="geeksforgeeks">GeeksforGeeks</label>
                <input
                  id="geeksforgeeks"
                  type="text"
                  placeholder="Enter your GeeksforGeeks Username"
                  value={profile.competitiveProfiles.geeksforgeeks || ""}
                  //   onChange={}
                  className="w-full p-2 rounded bg-gray-900 text-white"
                />
              </div>
              <div>
                <label htmlFor="hackerrank">Hackerrank</label>
                <input
                  id="hackerrank"
                  type="text"
                  placeholder="Enter your Hackerrank Username"
                  value={profile.competitiveProfiles.hackerrank || ""}
                  //   onChange={}
                  className="w-full p-2 rounded bg-gray-900 text-white"
                />
              </div>
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xl font-semibold">Education</h2>
            <div>
              <label className="block">Degree</label>
              <input
                type="text"
                value={profile.education?.degree || ""}
                onChange={(e) =>
                  handleNestedChange("education", "degree", e.target.value)
                }
                className="w-full p-2 rounded bg-gray-900 text-white"
              />
            </div>

            <div>
              <label className="block">CGPA</label>
              <input
                type="number"
                value={profile.education?.cgpa || ""}
                onChange={(e) =>
                  handleNestedChange("education", "cgpa", e.target.value)
                }
                className="w-full p-2 rounded bg-gray-900 text-white"
              />
            </div>

            <div>
              <label className="block">Institution</label>
              <input
                type="text"
                value={profile.education?.institution || ""}
                onChange={(e) =>
                  handleNestedChange("education", "institution", e.target.value)
                }
                className="w-full p-2 rounded bg-gray-900 text-white"
              />
            </div>
          </div>

          <button
            type="submit"
            // disabled={saving}
            className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-full"
          >
            {/* {saving ? "Saving..." : "Save Changes"} */}
            Save
          </button>
        </form>

        {/* <UserProfileSection
          fullName={userData.fullName}
          username={userData.user.username}
          profilePicture={userData.profilePicture}
          bgBanner={userData.backgroundBanner}
          headLine={userData.headLine}
        />
        <AboutSection about={userData.about} />
        <DomainRoleSection domain={userData.domain} role={userData.role} />
        <TagsSection tags={userData.tags} />
        <CompetitiveProgrammingSection
          codingProfiles={userData.competitiveProfiles}
        />
        <DevelopmentSection
          versionControlProfiles={userData.developmentProfiles}
        />
        <EducationSection education={userData.education} />
        <SocialsSection socials={userData.socials} /> */}
      </div>
    </div>
  );
};

export default EditProfilePage;

// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../api"; // your axios instance

// export default function EditProfilePage() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);

//   // fetch profile data
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await api.get(`/profiles/${id}`);
//         setProfile(res.data);
//       } catch (err) {
//         console.error("Failed to fetch profile", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProfile((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleNestedChange = (section, field, value) => {
//     setProfile((prev) => ({
//       ...prev,
//       [section]: {
//         ...prev[section],
//         [field]: value,
//       },
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSaving(true);
//     try {
//       await api.put(`/profiles/${id}`, profile); // update API
//       navigate(`/profiles/${id}`);
//     } catch (err) {
//       console.error("Failed to update profile", err);
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading) return <p className="text-center mt-10">Loading...</p>;
//   if (!profile) return <p className="text-center mt-10">Profile not found.</p>;

//   return (
//     <div className="flex flex-col items-center mt-10 text-white">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-gradient-to-r from-gray-900 to-blue-800 rounded-2xl shadow-lg p-6 w-[90%] max-w-3xl space-y-6"
//       >
//         <h1 className="text-2xl font-bold">Edit Profile</h1>

// {/* Basic Info */}
// <div>
//   <label className="block">Full Name</label>
//   <input
//     type="text"
//     name="fullName"
//     value={profile.fullName || ""}
//     onChange={handleChange}
//     className="w-full p-2 rounded bg-gray-900 text-white"
//   />
// </div>

// <div>
//   <label className="block">Headline</label>
//   <input
//     type="text"
//     name="headLine"
//     value={profile.headLine || ""}
//     onChange={handleChange}
//     className="w-full p-2 rounded bg-gray-900 text-white"
//   />
// </div>

// <div>
//   <label className="block">About</label>
//   <textarea
//     name="about"
//     value={profile.about || ""}
//     onChange={handleChange}
//     className="w-full p-2 rounded bg-gray-900 text-white"
//   />
// </div>

// {/* Role & Domain */}
// <div className="flex space-x-4">
//   <div>
//     <label className="block">Role</label>
//     <input
//       type="text"
//       name="role"
//       value={profile.role || ""}
//       onChange={handleChange}
//       className="w-full p-2 rounded bg-gray-900 text-white"
//     />
//   </div>

//   <div>
//     <label className="block">Domain</label>
//     <input
//       type="text"
//       name="domain"
//       value={profile.domain || ""}
//       onChange={handleChange}
//       className="w-full p-2 rounded bg-gray-900 text-white"
//     />
//   </div>
// </div>

// {/* Socials */}
// <div>
//   <h2 className="text-xl font-semibold">Social Links</h2>
//   {Object.keys(profile.socials || {}).map((key) => (
//     <div key={key} className="mt-2">
//       <label className="block capitalize">{key}</label>
//       <input
//         type="text"
//         value={profile.socials[key] || ""}
//         onChange={(e) =>
//           handleNestedChange("socials", key, e.target.value)
//         }
//         className="w-full p-2 rounded bg-gray-900 text-white"
//       />
//     </div>
//   ))}
// </div>

// {/* Development Profiles */}
// <div>
//   <h2 className="text-xl font-semibold">Development Profiles</h2>
//   {Object.keys(profile.developmentProfiles || {}).map((key) => (
//     <div key={key} className="mt-2">
//       <label className="block capitalize">{key}</label>
//       <input
//         type="text"
//         value={profile.developmentProfiles[key] || ""}
//         onChange={(e) =>
//           handleNestedChange("developmentProfiles", key, e.target.value)
//         }
//         className="w-full p-2 rounded bg-gray-900 text-white"
//       />
//     </div>
//   ))}
// </div>

// {/* Competitive Profiles */}
// <div>
//   <h2 className="text-xl font-semibold">Competitive Profiles</h2>
//   {Object.keys(profile.competitiveProfiles || {}).map((key) => (
//     <div key={key} className="mt-2">
//       <label className="block capitalize">{key}</label>
//       <input
//         type="text"
//         value={profile.competitiveProfiles[key] || ""}
//         onChange={(e) =>
//           handleNestedChange("competitiveProfiles", key, e.target.value)
//         }
//         className="w-full p-2 rounded bg-gray-900 text-white"
//       />
//     </div>
//   ))}
// </div>

// {/* Education */}
// <div>
//   <h2 className="text-xl font-semibold">Education</h2>
//   <div>
//     <label className="block">Degree</label>
//     <input
//       type="text"
//       value={profile.education?.degree || ""}
//       onChange={(e) =>
//         handleNestedChange("education", "degree", e.target.value)
//       }
//       className="w-full p-2 rounded bg-gray-900 text-white"
//     />
//   </div>

//   <div>
//     <label className="block">CGPA</label>
//     <input
//       type="number"
//       value={profile.education?.cgpa || ""}
//       onChange={(e) =>
//         handleNestedChange("education", "cgpa", e.target.value)
//       }
//       className="w-full p-2 rounded bg-gray-900 text-white"
//     />
//   </div>

//   <div>
//     <label className="block">Institution</label>
//     <input
//       type="text"
//       value={profile.education?.institution || ""}
//       onChange={(e) =>
//         handleNestedChange("education", "institution", e.target.value)
//       }
//       className="w-full p-2 rounded bg-gray-900 text-white"
//     />
//   </div>
// </div>

// <button
//   type="submit"
//   disabled={saving}
//   className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-full"
// >
//   {saving ? "Saving..." : "Save Changes"}
// </button>
//       </form>
//     </div>
//   );
// }
