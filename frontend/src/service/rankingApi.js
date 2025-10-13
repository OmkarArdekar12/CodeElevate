import api from "./api";

export const getAllRankings = async () => {
  const response = await api.get("/rankings", {
    withCredentials: true,
  });
  return response.data;
};

export const getCompetitiveProgrammingRankings = async () => {
  const response = await api.get("/rankings/competitive-programming", {
    withCredentials: true,
  });
  return response.data;
};

export const getDevelopmentRankings = async () => {
  const response = await api.get("/rankings/development", {
    withCredentials: true,
  });
  return response.data;
};

export const getRankerRankings = async () => {
  const response = await api.get("/rankings/rankers", {
    withCredentials: true,
  });
  return response.data;
};

export const getContributorRankings = async () => {
  const response = await api.get("/rankings/contributors", {
    withCredentials: true,
  });
  return response.data;
};

export const getAllRounderRankings = async () => {
  const response = await api.get("/rankings/all-rounders", {
    withCredentials: true,
  });
  return response.data;
};
