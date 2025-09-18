import express from "express";
import {
  codeforcesStats,
  leetCodeStats,
} from "../controllers/competitiveProgrammingStatsControllers.js";

const router = express.Router();

//Codeforces Stats Route/API
router.get("/codeforces/:username", codeforcesStats);

//LeetCode Stats Route/API
router.get("/leetcode/:username", leetCodeStats);

export default router;
