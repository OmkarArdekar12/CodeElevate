import express from "express";
import { githubStats } from "../controllers/developmentProfilesStatsControllers.js";

const router = express.Router();

router.get("/github/:username", githubStats);

export default router;
