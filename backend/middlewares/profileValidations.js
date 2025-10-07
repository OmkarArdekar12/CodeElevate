import { profileValidationSchema } from "../validations/profileValidations.js";
import Profile from "../models/profile.js";

export const validateProfile = (req, res, next) => {
  const { error } = profileValidationSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      message: "Validation failed",
      details: error.details.map((d) => d.message),
    });
  }

  next();
};

export const isOwner = async (req, res, next) => {
  try {
    const profileUserId = req.params.id;
    const clientUserId = req.user._id;

    const profile = await Profile.findOne({ user: profileUserId });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    if (profile.user.toString() !== clientUserId.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to edit this profile" });
    }

    next();
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err });
  }
};

// export const isOwner = async (req, res, next) => {
//   try {
//     const profileId = req.params.id;
//     const userId = req.user._id;
//     const profile = await Profile.findById({ user: profileId });
//     if (!profile) {
//       return res.status(404).json({ message: "Profile not found" });
//     }
//     if (profileId.toString() !== userId.toString()) {
//       return res
//         .status(403)
//         .json({ message: "You are not authorized to edit this profile" });
//     }
//     next();
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err });
//   }
// };
