import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api"; // your axios instance

export default function EditProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get(`/profiles/${id}`);
        setProfile(res.data);
      } catch (err) {
        console.error("Failed to fetch profile", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put(`/profiles/${id}`, profile); // update API
      navigate(`/profiles/${id}`);
    } catch (err) {
      console.error("Failed to update profile", err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!profile) return <p className="text-center mt-10">Profile not found.</p>;

  return (
    <div className="flex flex-col items-center mt-10 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-gradient-to-r from-gray-900 to-blue-800 rounded-2xl shadow-lg p-6 w-[90%] max-w-3xl space-y-6"
      >
        <h1 className="text-2xl font-bold">Edit Profile</h1>

        {/* Basic Info */}
        <div>
          <label className="block">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={profile.fullName || ""}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
        </div>

        <div>
          <label className="block">Headline</label>
          <input
            type="text"
            name="headLine"
            value={profile.headLine || ""}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
        </div>

        <div>
          <label className="block">About</label>
          <textarea
            name="about"
            value={profile.about || ""}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
        </div>

        {/* Role & Domain */}
        <div className="flex space-x-4">
          <div>
            <label className="block">Role</label>
            <input
              type="text"
              name="role"
              value={profile.role || ""}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-800 text-white"
            />
          </div>

          <div>
            <label className="block">Domain</label>
            <input
              type="text"
              name="domain"
              value={profile.domain || ""}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-800 text-white"
            />
          </div>
        </div>

        {/* Socials */}
        <div>
          <h2 className="text-xl font-semibold">Social Links</h2>
          {Object.keys(profile.socials || {}).map((key) => (
            <div key={key} className="mt-2">
              <label className="block capitalize">{key}</label>
              <input
                type="text"
                value={profile.socials[key] || ""}
                onChange={(e) =>
                  handleNestedChange("socials", key, e.target.value)
                }
                className="w-full p-2 rounded bg-gray-800 text-white"
              />
            </div>
          ))}
        </div>

        {/* Development Profiles */}
        <div>
          <h2 className="text-xl font-semibold">Development Profiles</h2>
          {Object.keys(profile.developmentProfiles || {}).map((key) => (
            <div key={key} className="mt-2">
              <label className="block capitalize">{key}</label>
              <input
                type="text"
                value={profile.developmentProfiles[key] || ""}
                onChange={(e) =>
                  handleNestedChange("developmentProfiles", key, e.target.value)
                }
                className="w-full p-2 rounded bg-gray-800 text-white"
              />
            </div>
          ))}
        </div>

        {/* Competitive Profiles */}
        <div>
          <h2 className="text-xl font-semibold">Competitive Profiles</h2>
          {Object.keys(profile.competitiveProfiles || {}).map((key) => (
            <div key={key} className="mt-2">
              <label className="block capitalize">{key}</label>
              <input
                type="text"
                value={profile.competitiveProfiles[key] || ""}
                onChange={(e) =>
                  handleNestedChange("competitiveProfiles", key, e.target.value)
                }
                className="w-full p-2 rounded bg-gray-800 text-white"
              />
            </div>
          ))}
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
              className="w-full p-2 rounded bg-gray-800 text-white"
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
              className="w-full p-2 rounded bg-gray-800 text-white"
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
              className="w-full p-2 rounded bg-gray-800 text-white"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-full"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
