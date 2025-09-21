import api from "./api";

export const leetCodeStats = async (username) => {
  const userLeetCodeData = await api.get(
    `/stats/competitive-programming/leetcode/${username}`
  );
  return userLeetCodeData.data;
};

export const codeforcesStats = async (username) => {
  const userCodeforcesData = await api.get(
    `/stats/competitive-programming/codeforces/${username}`
  );
  return userCodeforcesData.data;
};
