import express from "express";
import auth from "../middlewares/auth.js";
import Profile from "../models/profile.js";

const router = express.Router();

//All Profiles Route
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", "username");
    res.status(200).json(profiles);
  } catch (err) {
    res.status(500).json({ message: "Error in fetching profiles", error: err });
  }
});

//Show Profile Route
router.get("/:userId", async (req, res) => {
  try {
    const id = req.params.userId;
    const profile = await Profile.findOne({ user: id }).populate(
      "user",
      "username"
    );
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ message: "Error in fetching profile", error: err });
  }
});

//

export default router;
