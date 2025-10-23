import axios from "axios";

const cfApi = axios.create({
  baseURL: "https://codeforces.com/api",
  timeout: 10000,
});

//Codeforces Stats Controller
export const codeforcesStats = async (req, res) => {
  const { username } = req.params;
  try {
    if (!username || typeof username !== "string" || username.trim() === "") {
      return res.status(400).json({ message: "Invalid codeforces username" });
    }

    const userInfo = await cfApi.get(`/user.info?handles=${username}`);
    const user = userInfo.data?.result?.[0];

    if (!user) {
      return res.status(404).json({ error: "Codeforces user not found" });
    }

    const userStatus = await cfApi.get(`/user.status?handle=${username}`);

    const submissions = userStatus.data?.result || [];

    const problemSolvedSet = new Set();
    submissions.forEach((sub) => {
      if (sub.verdict == "OK") {
        problemSolvedSet.add(`${sub.problem.contestId}-${sub.problem.index}`);
      }
    });

    const codeforcesData = {
      handle: user.handle,
      rating: user.rating || 0,
      contribution: user.contribution || 0,
      rank: user.rank || "unrated",
      maxRating: user.maxRating || 0,
      maxRank: user.maxRank || "unrated",
      friendOfCount: user.friendOfCount || 0,
      organization: user.organization || "N/A",
      lastOnlineTimeSeconds: user.lastOnlineTimeSeconds || 0,
      registrationTimeSeconds: user.registrationTimeSeconds || 0,
      city: user.city || "N/A",
      country: user.country || "N/A",
      totalProblemsSolved: problemSolvedSet.size,
    };
    // console.log(codeforcesData);
    return res.status(200).json(codeforcesData);
  } catch (err) {
    if (err.response && err.response.status === 404) {
      return res
        .status(404)
        .json({ message: "Codeforces user not found", error: err });
    } else if (err.code === "ECONNABORTED") {
      return res.status(504).json({
        message: "Codeforces API timeout. Try again later.",
        error: err,
      });
    } else {
      // console.error("Codeforces API Error:", err.message);
      return res.status(500).json({
        message: "Failed to fetch Codeforces data",
        error: err,
      });
    }
  }
};

const lcApi = axios.create({
  baseURL: "https://leetcode.com/graphql",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

//LeetCode Stats Controller
export const leetCodeStats = async (req, res) => {
  const { username } = req.params;
  try {
    if (!username || typeof username !== "string" || username.trim() === "") {
      return res.status(400).json({ message: "Invalid leetCode username" });
    }

    const statsQuery = `
      query userProfile($username: String!) {
        matchedUser(username: $username) {
          username
          submitStats {
            acSubmissionNum {
              difficulty
              count
            }
          }
          badges {
            name
          }
          userCalendar {
            streak
            totalActiveDays
          }
          profile {
            ranking
          }
        }
      }
    `;

    const contestQuery = `
      query userContestRanking($username: String!) {
        userContestRanking(username: $username) {
          attendedContestsCount
          rating
          globalRanking
          totalParticipants
          topPercentage
          badge {
            name
          }
        }
      }
    `;

    const [statsResponse, contestResponse] = await Promise.allSettled([
      lcApi.post("", { query: statsQuery, variables: { username } }),
      lcApi.post("", { query: contestQuery, variables: { username } }),
    ]);

    const user =
      statsResponse.status === "fulfilled"
        ? statsResponse.value.data.data.matchedUser
        : null;

    const contest =
      contestResponse.status === "fulfilled"
        ? contestResponse.value.data.data.userContestRanking
        : null;

    if (!user) {
      return res.status(404).json({ error: "LeetCode user not found" });
    }

    const stats = user.submitStats?.acSubmissionNum || [];
    const easy = stats.find((d) => d.difficulty === "Easy")?.count || 0;
    const medium = stats.find((d) => d.difficulty === "Medium")?.count || 0;
    const hard = stats.find((d) => d.difficulty === "Hard")?.count || 0;
    const totalSolved = easy + medium + hard;
    const badgeNames = (user.badges || []).map((b) => b.name);
    const numberOfBadges = badgeNames.length;
    const hasKnight =
      badgeNames.includes("Knight") || contest?.badge?.name === "Knight";
    const hasGuardian =
      badgeNames.includes("Guardian") || contest?.badge?.name === "Guardian";
    const leetCodeTotalUser = 5000001;

    const leetCodeData = {
      username: username,
      totalLeetCodeUsers: leetCodeTotalUser,
      ranking: user.profile.ranking || null,
      easySolved: easy,
      mediumSolved: medium,
      hardSolved: hard,
      totalSolved: totalSolved,
      numberOfBadges,
      badgeNames,
      hasKnight,
      hasGuardian,
      maxStreak: user.userCalendar?.streak || 0,
      totalActiveDays: user.userCalendar?.totalActiveDays || 0,
      contestRating: contest?.rating || null,
      contestRank: contest?.globalRanking || null,
      totalContestParticipants: contest?.totalParticipants || null,
      topPercentage: contest?.topPercentage || null,
      topGlobalPercentage: user.profile.ranking
        ? Number(user.profile.ranking / leetCodeTotalUser)
        : null,
      contestBadge: contest?.badge?.name || null,
      contestsAttended: contest?.attendedContestsCount || 0,
    };
    // console.log(leetCodeData);
    return res.status(200).json(leetCodeData);
  } catch (err) {
    if (err.code === "ECONNABORTED") {
      return res.status(504).json({
        message: "LeetCode API timeout. Try again later.",
        error: err,
      });
    } else {
      // console.error("LeetCode API Error:", err.message);
      return res.status(500).json({
        message: "Failed to fetch LeetCode data",
        error: err,
      });
    }
  }
};

// export const leetCodeStats = async (req, res) => {
//   const { username } = req.params;
//   try {
//     const query = `
//       query userProfile($username: String!) {
//         matchedUser(username: $username) {
//           username
//           submitStats {
//             acSubmissionNum {
//               difficulty
//               count
//             }
//           }
//           profile {
//             ranking
//           }
//         }
//       }
//     `;
//     const response = await axios.post(
//       "https://leetcode.com/graphql",
//       {
//         query,
//         variables: { username },
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     const user = response.data.data.matchedUser;
//     if (!user) {
//       return res.status(404).json({ error: "LeetCode user not found" });
//     }
//     const stats = user.submitStats.acSubmissionNum;
//     const easy = stats.find((d) => d.difficulty === "Easy")?.count || 0;
//     const medium = stats.find((d) => d.difficulty === "Medium")?.count || 0;
//     const hard = stats.find((d) => d.difficulty === "Hard")?.count || 0;
//     const leetCodeData = {
//       ranking: user.profile.ranking || null,
//       easySolved: easy,
//       mediumSolved: medium,
//       hardSolved: hard,
//       totalSolved: easy + medium + hard,
//     };
//     res.status(200).json(leetCodeData);
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "Failed to fetch LeetCode data", error: err });
//   }
// });
