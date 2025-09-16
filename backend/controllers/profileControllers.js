import express from "express";
import auth from "../middlewares/auth.js";
import Profile from "../models/profile.js";

export const getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", "username");
    res.status(200).json(profiles);
  } catch (err) {
    res.status(500).json({ message: "Error in fetching profiles", error: err });
  }
};

export const showProfile = async (req, res) => {
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
};

// export const createProfile = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     let profile = await Profile.findOne({ user: userId });
//     if (profile) {
//       profile = Object.assign(profile, req.body);
//       await profile.save();
//       return res.status(200).json(profile);
//     }

//     profile = new Profile({ user: userId, ...req.body });
//     await profile.save();
//     res.status(200).json(profile);
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "Error in creating/updating profile", error: err });
//   }
// };

export const updateProfile = async (req, res) => {
  try {
    const clientUserId = req.params.userId;
    const ownerUserId = req.user._id.toString();

    if (clientUserId !== ownerUserId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this profile" });
    }

    const profile = await Profile.findOne({ user: clientUserId });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    Object.assign(profile, req.body);
    await profile.save();
    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ message: "Error in updating profile", error: err });
  }
};

export const destroyProfile = async (req, res) => {
  try {
    const clientUserId = req.params.userId;
    const ownerUserId = req.user._id.toString();

    if (clientUserId !== ownerUserId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this profile" });
    }

    await Profile.findOneAndDelete({ user: req.params.userid });
    res.json({ message: "Profile deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting profile" });
  }
};
