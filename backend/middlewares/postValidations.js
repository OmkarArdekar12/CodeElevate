import mongoose from "mongoose";
import { postValidationSchema } from "../validations/postValidations.js";
import Post from "../models/post.js";

export const validatePost = (req, res, next) => {
  const { error } = postValidationSchema.validate(req.body, {
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
    const { id: postId } = req.params;
    const userId = req.user._id;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.user.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    next();
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err });
  }
};

export const isCommentOwner = async (req, res, next) => {
  try {
    const { postId, commentId } = req.params;

    const post = await Post.findById(postId).populate(
      "comments.user",
      "username"
    );
    // const post = await Post.findById(postId).populate([
    //   { path: "comments.user", select: "username" },
    //   { path: "comments.profile", select: "fullName profilePicture headLine" },
    // ]);
    // const post = await Post.findById(postId)
    //   .populate({ path: "comments.user", select: "username" })
    //   .populate({
    //     path: "comments.profile",
    //     select: "fullName profilePicture headLine",
    //   });

    if (!post) {
      return res.status(404).json({ message: "Post not found!" });
    }

    const comment = post.comments.id(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found!" });
    }

    const currUserId = req.user._id;
    const commentUserId = comment.user._id;

    if (currUserId.toString() !== commentUserId.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    next();
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err });
  }
};
