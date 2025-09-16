import api from "./api";

export const allProfiles = async () => {
  const profiles = await api.get("/profiles");
  return profiles;
};
