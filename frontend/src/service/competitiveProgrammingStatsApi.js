import api from "./api";

export const leetCodeStats = async (username) => {
  const userLeetCodeData = api.get(`/leetcode/${username}`);
  return userLeetCodeData;
};
