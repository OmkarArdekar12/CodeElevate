import api from "./api";

export const allProfiles = async () => {
  const profiles = await api.get("/profiles");
  return profiles;
};

export const showProfile = async (id) => {
  const profile = await api.get(`/profiles/${id}`);
  return profile.data;
};

export const editProfile = async (id, profileData) => {
  const response = await api.put(`/profiles/${id}`, { profileData });
  return response.data;
};
