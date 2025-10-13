import express from "express";
import {
  getRankings,
  getCompetitiveProgrammingRankings,
  getDevelopmentRankings,
  getRankerRankings,
  getContributorRankings,
  getAllRounderRankings,
} from "../controllers/rankingController.js";

const router = express.Router();

//Get all 5 Rankings Route
router.get("/", getRankings);

//Get Competitive Programming Ranking Route
router.get("/competitive-programming", getCompetitiveProgrammingRankings);

//Get Development Ranking Route
router.get("/development", getDevelopmentRankings);

//Get Rankers Ranking Route
router.get("/rankers", getRankerRankings);

//Get Contributors Ranking Route
router.get("/contributors", getContributorRankings);

//Get All Rounders Ranking Route
router.get("/all-rounders", getAllRounderRankings);

export default router;
