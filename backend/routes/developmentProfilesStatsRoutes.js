import express from "express";
import { githubStats } from "../controllers/developmentProfilesStatsControllers.js";

const router = express.Router();

//GitHub Stats Route/API
router.get("/github/:username", githubStats);

export default router;
