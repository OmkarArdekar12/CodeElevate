import express from "express";
import auth from "../middlewares/auth.js";
import verifyAuth from "../middlewares/verifyAuth.js";
import auth2FA from "../middlewares/auth2FA.js";
import Profile from "../models/profile.js";
import { validateProfile, isOwner } from "../middlewares/profileValidations.js";
import {
  getAllProfiles,
  showProfile,
  updateProfile,
  destroyProfile,
  getUserData,
  getConnections,
  // createProfile,
} from "../controllers/profileController.js";
import multer from "multer";
import { storage } from "../config/cloudConfig.js";

const upload = multer({ storage });

const router = express.Router();

//All Profiles Route
router.get("/", getAllProfiles);

//Get User Data Route
router.get("/data/:id", getUserData);

//Get Connections Route
router.get("/:userId/connections", auth, verifyAuth, auth2FA, getConnections);

//Update Profile Route
router.put(
  "/:id",
  auth,
  verifyAuth,
  auth2FA,
  isOwner,
  upload.fields([
    { name: "profilePicture", maxCount: 1 },
    { name: "backgroundBanner", maxCount: 1 },
  ]),
  validateProfile,
  updateProfile
);

//Delete Profile Route
router.delete("/:userId", auth, verifyAuth, auth2FA, destroyProfile);

//Show Profile Route
router.get("/:id", showProfile);

// //Create Profile Route
// router.post("/", auth, verifyAuth, auth2FA, createProfile);

export default router;
