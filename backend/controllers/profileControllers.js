import express from "express";
import auth from "../middlewares/auth.js";
import Profile from "../models/profile.js";

//All Profile Controller
export const getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", "username");
    res.status(200).json(profiles);
  } catch (err) {
    res.status(500).json({ message: "Error in fetching profiles", error: err });
  }
};

//Show Profile Controller
export const showProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const profile = await Profile.findOne({ user: userId }).populate(
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

//Update Profile Controller
export const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const profile = await Profile.findOne({ user: id });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    if (req.files) {
      if (req.files.profilePicture) {
        profile.profilePicture = req.files.profilePicture[0].path;
      }
      if (req.files.backgroundBanner) {
        profile.backgroundBanner = req.files.backgroundBanner[0].path;
      }
    }

    const updatableFields = [
      "fullName",
      "headLine",
      "role",
      "domain",
      "tags",
      "about",
      "showStats",
      "developmentProfiles",
      "competitiveProfiles",
      "socials",
      "education",
    ];

    updatableFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        if (
          typeof req.body[field] === "object" &&
          !Array.isArray(req.body[field])
        ) {
          profile[field] = { ...profile[field], ...req.body[field] };
        } else {
          profile[field] = req.body[field];
        }
      }
    });

    if (req.body.tags !== undefined) {
      profile.tags = Array.isArray(req.body.tags)
        ? req.body.tags.map((tag) => tag || "")
        : ["", "", "", "", ""];
      while (profile.tags.length < 5) {
        profile.tags.push("");
      }
      profile.tags = profile.tags.slice(0, 5);
    }

    if (req.body.education && "cgpa" in req.body.education) {
      let cgpa = req.body.education.cgpa;

      if (
        cgpa === "" ||
        cgpa === "null" ||
        cgpa === null ||
        cgpa === undefined
      ) {
        profile.education.cgpa = null;
      } else {
        const numCgpa = Number(cgpa);
        if (numCgpa < 1 || numCgpa > 10) {
          return res.status(400).json({ message: "Invalid CGPA value" });
        }
        profile.education.cgpa = numCgpa;
      }
    }

    await profile.save();

    res.status(200).json({ message: "Profile Updated Successfull" });
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({
      message: "Error in updating profile",
      error: err.message,
    });
  }
};

//Destroy Profile Controller
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

// //Create Profile Controller
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

// export const showProfile = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const profile = await Profile.findOne({ _id: id }).populate(
//       "user",
//       "username"
//     );
//     if (!profile) {
//       return res.status(404).json({ message: "Profile not found" });
//     }
//     res.status(200).json(profile);
//   } catch (err) {
//     res.status(500).json({ message: "Error in fetching profile", error: err });
//   }
// };
// export const updateProfile = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const profile = await Profile.findOne({ user: id });
//     if (!profile) {
//       return res.status(404).json({ message: "Profile not found" });
//     }
//     if (req.files) {
//       if (req.files.profilePicture) {
//         profile.profilePicture = req.files.profilePicture[0].path;
//       }
//       if (req.files.backgroundBanner) {
//         profile.backgroundBanner = req.files.backgroundBanner[0].path;
//       }
//     }
//     const updatableFields = [
//       "fullName",
//       "headLine",
//       "role",
//       "domain",
//       "tags",
//       "about",
//       "showStats",
//       "developmentProfiles",
//       "competitiveProfiles",
//       "socials",
//       "education",
//     ];
//     updatableFields.forEach((field) => {
//       if (req.body[field] !== undefined) {
//         if (
//           typeof req.body[field] === "object" &&
//           !Array.isArray(req.body[field])
//         ) {
//           profile[field] = { ...profile[field], ...req.body[field] };
//         } else {
//           profile[field] = req.body[field];
//         }
//       }
//     });
//     if (req.body.tags !== undefined) {
//       profile.tags = Array.isArray(req.body.tags)
//         ? req.body.tags.map((tag) => tag || "")
//         : ["", "", "", "", ""];
//       while (profile.tags.length < 5) {
//         profile.tags.push("");
//       }
//       profile.tags = profile.tags.slice(0, 5);
//     }
//      if (
//        req.body.education &&
//        req.body.education.cgpa &&
//        req.body.education.cgpa !== undefined
//      ) {
//        profile.education.cgpa =
//          req.body.education.cgpa === "" ? null : Number(req.body.education.cgpa);
//      } else {
//        req.body.education.cgpa = 0;
//      }
//     await profile.save();
//     res.status(200).json({ message: "Profile Updated Successfull" });
//   } catch (err) {
//     console.error("Error updating profile:", err);
//     res.status(500).json({
//       message: "Error in updating profile",
//       error: err.message,
//     });
//   }
// };
