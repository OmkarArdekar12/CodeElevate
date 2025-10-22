import express from "express";
import auth from "../middlewares/auth.js";
import { cloudinary } from "../config/cloudConfig.js";
import mongoose from "mongoose";
import Profile from "../models/profile.js";
import User from "../models/user.js";
import Notification from "../models/notification.js";
import Message from "../models/message.js";
import Post from "../models/post.js";
import RankingCache from "../models/rankingCache.js";

//All Profile Controller
export const getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", "username");
    return res.status(200).json(profiles);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error in fetching profiles", error: err });
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
    return res.status(200).json(profile);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error in fetching profile", error: err });
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
        const uploadProfilePictureResult = await cloudinary.uploader.upload(
          req.files.profilePicture[0].path,
          {
            folder: "CodeElevate_Project",
            public_id: `${id}-profile-picture`,
            overwrite: true,
          }
        );
        profile.profilePicture = uploadProfilePictureResult.secure_url;

        const oldUserImagePublicId = req.files.profilePicture[0].filename;
        if (oldUserImagePublicId) {
          await cloudinary.uploader.destroy(oldUserImagePublicId);
        }
      }
      if (req.files.backgroundBanner) {
        const uploadBgBannerResult = await cloudinary.uploader.upload(
          req.files.backgroundBanner[0].path,
          {
            folder: "CodeElevate_Project",
            public_id: `${id}-bg-banner`,
            overwrite: true,
          }
        );
        profile.backgroundBanner = uploadBgBannerResult.secure_url;

        const oldBannerImagePublicId = req.files.backgroundBanner[0].filename;
        if (oldBannerImagePublicId) {
          await cloudinary.uploader.destroy(oldBannerImagePublicId);
        }
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

    return res.status(200).json({ message: "Profile Updated Successfull" });
  } catch (err) {
    return res.status(500).json({
      message: "Error in updating profile",
      error: err.message,
    });
  }
};

//Destroy Profile Controller
export const destroyProfile = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const userId = req.user._id; //logged-in user
    const profileUserId = req.params.id; //profileUserId to delete

    if (userId.toString() !== profileUserId.toString()) {
      await session.abortTransaction();
      return res.status(403).json({
        message: "Unauthorized: You are not the owner of this profile.",
      });
    }

    const profile = await Profile.findOne({ user: profileUserId }).session(
      session
    );
    if (!profile) {
      await session.abortTransaction();
      return res.status(404).json({ message: "User Profile not found." });
    }

    //delete all notifications sent and received both
    await Notification.deleteMany({
      $or: [{ from: profileUserId }, { to: profileUserId }],
    }).session(session);

    //delete all messages and also images with messages
    const allMessages = await Message.find({
      $or: [{ senderId: profileUserId }, { receiverId: profileUserId }],
    }).session(session);
    for (const message of allMessages) {
      if (message?.image?.publicId) {
        await cloudinary.uploader.destroy(message.image.publicId);
      }
      await message.deleteOne({ session });
    }

    //remove user all likes and comments, and delete all user posts
    const allPosts = await Post.find().session(session);
    for (const post of allPosts) {
      //remove likes by this user
      if (post.likes.includes(profileUserId)) {
        post.likes = post.likes.filter(
          (like) => like.toString() !== profileUserId.toString()
        );
        await post.save({ session });
      }
      //remove comments by this user
      post.comments = post.comments.filter(
        (comment) => comment.user.toString() !== profileUserId.toString()
      );
      await post.save({ session });
      //delete post belonging to the currUser
      if (post.user.toString() === profileUserId.toString()) {
        if (post?.image?.publicId) {
          await cloudinary.uploader.destroy(post.image.publicId);
        }
        await post.deleteOne({ session });
      }
    }

    //removing from followers and following
    await Profile.updateMany(
      {},
      {
        $pull: {
          followers: profileUserId,
          following: profileUserId,
        },
      }
    ).session(session);

    //refreshing ranking cache
    await RankingCache.deleteMany({}).session(session);

    //deleting profilePicture and backgroundBanner
    if (profile?.profilePicture !== "") {
      await cloudinary.uploader.destroy(`${profileUserId}-profile-picture`);
    }
    if (profile?.backgroundBanner !== "") {
      await cloudinary.uploader.destroy(`${profileUserId}-bg-banner`);
    }

    //delete profile and user
    await Profile.findOneAndDelete({ user: profileUserId }).session(session);
    await User.findOneAndDelete({ _id: profileUserId }).session(session);

    await session.commitTransaction();
    session.endSession();

    //logging-out the user
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      req.session.destroy((err) => {
        if (err) {
          return next(err);
        }
        res.clearCookie("connect.sid");
        return res
          .status(200)
          .json({ message: "User Profile and all associated data deleted." });
      });
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    return res
      .status(500)
      .json({ message: "Error in deleting profile", error: err });
  }
};

//Get Connections Controller
export const getConnections = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userID" });
    }

    const profile = await Profile.findOne({ user: userId })
      .populate("followers", "username")
      .populate("following", "username");

    if (!profile) {
      return res.status(404).json({ message: "User Profile not found" });
    }

    const followerIds = profile.followers.map((follower) => follower._id);
    const followingIds = profile.following.map((following) => following._id);

    const mutualConnectionIds = followerIds.filter((followerId) =>
      followingIds.some((followingId) => followingId.equals(followerId))
    );

    const getUserDetails = async (userIds) => {
      const users = await User.find({ _id: { $in: userIds } })
        .select("username")
        .lean();

      const profiles = await Profile.find({ user: { $in: userIds } })
        .select("user fullName profilePicture headLine")
        .lean();

      return users.map((user) => {
        const userProfile = profiles.find(
          (profile) => profile.user.toString() === user._id.toString()
        );

        return {
          userId: user._id,
          username: user.username,
          fullName: userProfile?.fullName || "",
          profilePicture: userProfile?.profilePicture || "",
          headLine: userProfile?.headLine || "",
        };
      });
    };

    const [followers, following, connections] = await Promise.all([
      getUserDetails(followerIds),
      getUserDetails(followingIds),
      getUserDetails(mutualConnectionIds),
    ]);

    return res.status(200).json({
      connections: {
        followers,
        following,
        connections,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server error, failed to fetch connections!",
      error: err,
    });
  }
};

//Get User Data Controller
export const getUserData = async (req, res) => {
  try {
    const userId = req.params.id;
    const profile = await Profile.findOne({ user: userId }).populate(
      "user",
      "username"
    );
    if (!profile) {
      return res.status(404).json({ message: "User Profile not found" });
    }
    const userData = {
      userId: userId,
      profileId: profile._id,
      fullName: profile.fullName,
      username: profile.user.username,
      headLine: profile.headLine,
      profilePicture: profile.profilePicture,
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt,
    };
    return res.status(200).json(userData);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error in fetching profile", error: err });
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
