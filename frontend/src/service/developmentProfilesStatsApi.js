import api from "./api";

export const gitHubStats = async (username) => {
  const userGitHubData = await api.get(
    `/stats/development-profiles/github/${username}`
  );
  return userGitHubData.data;
};
