import express from "express";
import auth from "../middlewares/auth.js";
import Profile from "../models/profile.js";
import {
  getAllProfiles,
  showProfile,
  // createProfile,
  updateProfile,
  destroyProfile,
} from "../controllers/profileControllers.js";

const router = express.Router();

//All Profiles Route
router.get("/", getAllProfiles);

//Show Profile Route
router.get("/:id", showProfile);

//Create Profile Route
// router.post("/", auth, createProfile);

//Update Profile Route
router.put("/:userId", auth, updateProfile);

//Delete Profile Route
router.delete("/:userId", auth, destroyProfile);

export default router;
