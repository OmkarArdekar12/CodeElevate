import express from "express";
import auth from "../middlewares/auth.js";
import Profile from "../models/profile.js";
import { validateProfile, isOwner } from "../middlewares/profileValidations.js";
import {
  getAllProfiles,
  showProfile,
  updateProfile,
  destroyProfile,
  getUserData,
  // createProfile,
} from "../controllers/profileControllers.js";
import multer from "multer";
import { storage } from "../config/cloudConfig.js";

const upload = multer({ storage });

const router = express.Router();

//All Profiles Route
router.get("/", getAllProfiles);

//Show Profile Route
router.get("/:id", showProfile);

//Update Profile Route
router.put(
  "/:id",
  auth,
  isOwner,
  upload.fields([
    { name: "profilePicture", maxCount: 1 },
    { name: "backgroundBanner", maxCount: 1 },
  ]),
  validateProfile,
  updateProfile
);

//Delete Profile Route
router.delete("/:userId", auth, destroyProfile);

//Get User Data Route
router.get("/data/:id", getUserData);

// //Create Profile Route
// router.post("/", auth, createProfile);

export default router;
