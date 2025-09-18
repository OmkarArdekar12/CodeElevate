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
      rating: user.rating || 0,
      contribution: user.contribution || 0,
      rank: user.rank || "unrated",
      maxRating: user.maxRating || 0,
      maxRank: user.maxRank || "unrated",
      totalProblemsSolved: problemSolvedSet.size,
    };

    res.json(codeforcesData);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch Codeforces data", error: err });
  }
});

router.get("/leetcode/:username", async (req, res) => {
  const { username } = req.params;

  try {
    const query = `
      query userProfile($username: String!) {
        matchedUser(username: $username) {
          username
          submitStats {
            acSubmissionNum {
              difficulty
              count
            }
          }
          profile {
            ranking
          }
        }
      }
    `;

    const response = await axios.post(
      "https://leetcode.com/graphql",
      {
        query,
        variables: { username },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const user = response.data.data.matchedUser;
    if (!user) {
      return res.status(404).json({ error: "LeetCode user not found" });
    }

    const stats = user.submitStats.acSubmissionNum;
    const easy = stats.find((d) => d.difficulty === "Easy")?.count || 0;
    const medium = stats.find((d) => d.difficulty === "Medium")?.count || 0;
    const hard = stats.find((d) => d.difficulty === "Hard")?.count || 0;

    const leetCodeData = {
      ranking: user.profile.ranking || null,
      easySolved: easy,
      mediumSolved: medium,
      hardSolved: hard,
      totalSolved: easy + medium + hard,
    };

    res.status(200).json(leetCodeData);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch LeetCode data", error: err });
  }
});

export default router;
