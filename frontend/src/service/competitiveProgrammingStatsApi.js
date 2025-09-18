import api from "./api";

export const leetCodeStats = async (username) => {
  const userLeetCodeData = api.get(
    `/stats/competitive-programming/leetcode/${username}`
  );
  return userLeetCodeData;
};

export const codeforcesStats = async (username) => {
  const userCodeforcesData = api.get(
    `/stats/competitive-programming/codeforces/${username}`
  );
  return userCodeforcesData;
};
