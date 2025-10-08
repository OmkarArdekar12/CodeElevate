import express from "express";
import { getRankings } from "../controllers/rankingController.js";

const router = express.Router();

//Get all 5 Rankings Route
router.get("/", getRankings);

//Get Competitive Programming Ranking Route
router.get("/competitive-programming", getRankings);

//Get Development Ranking Route
router.get("/development", getRankings);

//Get Rankers Ranking Route
router.get("/rankers", getRankings);

//Get Contributors Ranking Route
router.get("/contributors", getRankings);

//Get All Rounders Ranking Route
router.get("/all-rounders", getRankings);

export default router;
