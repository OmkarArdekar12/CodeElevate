import axios from "axios";
import Profile from "../models/profile.js";
import RankingCache from "../models/rankingCache.js";

const dayInMS = 24 * 60 * 60 * 1000;
const baseURL = process.env.BASE_URL || "http://localhost:8080";

const safeNumber = (val) =>
  isNaN(val) || val === null || val === "" ? 0 : Number(val);

//Get All Ranking Controller
export const getRankings = async (req, res) => {
  try {
    let cache = await RankingCache.findOne();

    if (cache) {
      if (
        cache.lastUpdated &&
        !isNaN(new Date(cache.lastUpdated).getTime()) &&
        Date.now() - new Date(cache.lastUpdated).getTime() < 2 * dayInMS
      ) {
        return res.status(200).json({ ...cache.rankings, source: "cache" });
      }
    }

    const profiles = await Profile.find().populate("user");

    const rankingData = [];
    for (const profile of profiles) {
      const {
        competitiveProfiles,
        developmentProfiles,
        education,
        user,
        fullName,
        headLine,
        profilePicture,
      } = profile;

      const { leetCode, codeforces } = competitiveProfiles || {};
      const { github } = developmentProfiles || {};

      let leetCodeData = {};
      let codeforcesData = {};
      let githubData = {};

      try {
        if (leetCode) {
          leetCodeData = (
            await axios.get(
              `${baseURL}/api/stats/competitive-programming/leetcode/${leetCode}`
            )
          ).data;
        }
      } catch (err) {
        leetCodeData = {};
      }

      try {
        if (codeforces) {
          codeforcesData = (
            await axios.get(
              `${baseURL}/api/stats/competitive-programming/codeforces/${codeforces}`
            )
          ).data;
        }
      } catch (err) {
        codeforcesData = {};
      }

      try {
        if (github) {
          githubData = (
            await axios.get(
              `${baseURL}/api/stats/development-profiles/github/${github}`
            )
          ).data;
        }
      } catch (err) {
        githubData = {};
      }

      const cpScore =
        safeNumber(leetCodeData.totalSolved) +
        safeNumber(leetCodeData.contestRating) +
        safeNumber(codeforcesData.rating) * 1.5 +
        safeNumber(codeforcesData.totalProblemsSolved);

      const devScore =
        safeNumber(githubData.totalStars) * 5 +
        safeNumber(githubData.followers) * 2 +
        safeNumber(githubData.publicRepos) * 3;

      const rankerScore = safeNumber(education?.cgpa) * 10;

      const contributorScore = cpScore + devScore;

      const allRoundersScore = cpScore + devScore + rankerScore;

      rankingData.push({
        userId: user._id,
        profileId: profile._id,
        fullName,
        profilePicture,
        headLine,
        cpScore,
        devScore,
        rankerScore,
        contributorScore,
        allRoundersScore,
        createdAt: user.createdAt,
      });
    }

    const sortRank = (key) => {
      return [...rankingData].sort((a, b) => {
        if (b[key] === a[key]) {
          return new Date(a.createdAt) - new Date(b.createdAt);
        }
        return b[key] - a[key];
      });
    };

    const rankings = {
      competitiveProgramming: sortRank("cpScore"),
      development: sortRank("devScore"),
      rankers: sortRank("rankerScore"),
      contributors: sortRank("contributorScore"),
      allRounders: sortRank("allRoundersScore"),
    };

    if (cache) {
      cache.rankings = rankings;
      cache.lastUpdated = new Date();
      await cache.save();
    } else {
      await RankingCache.create({ rankings, lastUpdated: new Date() });
    }

    return res.status(200).json({ ...rankings, source: "fresh" });
  } catch (err) {
    // console.error("Ranking Error: ", err);
    return res
      .status(500)
      .json({ message: "Failed to compute all rankings", error: err });
  }
};

//Get Competitive Programming Ranking Controller
export const getCompetitiveProgrammingRankings = async (req, res) => {
  try {
    const response = await axios.get(`${baseURL}/api/rankings/`);
    const competitiveProgrammingRankings =
      response.data?.competitiveProgramming;
  } catch (err) {
    return res.status(500).json({
      message: "Failed to compute competitive programming rankings",
      error: err,
    });
  }
};
