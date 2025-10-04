import api from "./api";

export const allProfiles = async () => {
  const profiles = await api.get("/profiles", { withCredentials: true });
  return profiles;
};

export const showProfile = async (id) => {
  const profile = await api.get(`/profiles/${id}`, { withCredentials: true });
  return profile.data;
};

export const editProfile = async (userId, formData) => {
  const response = await api.put(`/profiles/${userId}`, formData, {
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getUserData = async (id) => {
  const userData = await api.get(`/profiles/data/${id}`, {
    withCredentials: true,
  });
  return userData.data;
};

export const getConnections = async (userId) => {
  const response = await api.get(`/profiles/${userId}/connections`, {
    withCredentials: true,
  });
  return response.data;
};
