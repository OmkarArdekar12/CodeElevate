import express from "express";
import axios from "axios";

const router = express.Router();

//Codeforces Stats Route/API
router.get("/codeforces/:username", async (req, res) => {
  const { username } = req.params;
  try {
    const userInfo = await axios.get(
      `https://codeforces.com/api/user.info?handles=${username}`
    );

    const user = userInfo.data.result[0];

    const userStatus = await axios.get(
      `https://codeforces.com/api/user.status?handle=${username}`
    );

    const submissions = userStatus.data.result;

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

    res.json(codeforcesData);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch Codeforces data", error: err });
  }
});

//LeetCode Stats Route/API
router.get("/leetcode/:username", async (req, res) => {
  const { username } = req.params;
  try {
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

    const [statsResponse, contestResponse] = await Promise.all([
      axios.post(
        "https://leetcode.com/graphql",
        { query: statsQuery, variables: { username } },
        { headers: { "Content-Type": "application/json" } }
      ),
      axios.post(
        "https://leetcode.com/graphql",
        { query: contestQuery, variables: { username } },
        { headers: { "Content-Type": "application/json" } }
      ),
    ]);

    const user = statsResponse.data.data.matchedUser;
    const contest = contestResponse.data.data.userContestRanking;

    if (!user) {
      return res.status(404).json({ error: "LeetCode user not found" });
    }

    const stats = user.submitStats.acSubmissionNum;
    const easy = stats.find((d) => d.difficulty === "Easy")?.count || 0;
    const medium = stats.find((d) => d.difficulty === "Medium")?.count || 0;
    const hard = stats.find((d) => d.difficulty === "Hard")?.count || 0;
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
      totalSolved: easy + medium + hard,
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
        ? user.profile.ranking / leetCodeTotalUser
        : null,
      contestBadge: contest?.badge?.name || null,
      contestsAttended: contest?.attendedContestsCount || 0,
    };

    res.status(200).json(leetCodeData);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch LeetCode data", error: err.message });
  }
});

export default router;

// router.get("/leetcode/:username", async (req, res) => {
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
