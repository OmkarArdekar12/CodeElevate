import express from "express";
import auth from "../middlewares/auth.js";
import Profile from "../models/profile.js";
import { validateProfile, isOwner } from "../middlewares/profileValidations.js";
import {
  getAllProfiles,
  showProfile,
  // createProfile,
  updateProfile,
  // destroyProfile,
} from "../controllers/profileControllers.js";
import multer from "multer";
import { storage } from "../config/cloudConfig.js";

const upload = multer({ storage });

const router = express.Router();

//All Profiles Route
router.get("/", getAllProfiles);

//Show Profile Route
router.get("/:id", showProfile);

//Create Profile Route
// router.post("/", auth, createProfile);

//Update Profile Route
// router.put("/:userId", auth, updateProfile);
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
// router.delete("/:userId", auth, destroyProfile);

export default router;
