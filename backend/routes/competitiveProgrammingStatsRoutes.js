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

export default router;
