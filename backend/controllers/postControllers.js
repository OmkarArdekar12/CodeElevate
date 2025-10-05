import Post from "../models/post.js";
import Profile from "../models/profile.js";
import { cloudinary } from "../config/cloudConfig.js";

//Create Post Controller
export const createPost = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user._id;
    const profile = await Profile.findOne({ user: userId });

    if (!profile) {
      return res.status(400).json({ message: "User Profile not found" });
    }

    const profileId = profile._id;

    let imageData = null;
    if (req.file) {
      imageData = {
        publicId: req.file.filename,
        url: req.file.path,
      };
      // const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      //   folder: "CodeElevate_Project/posts",
      // });
      // imageData = {
      //   publicId: uploadResult.public_id,
      //   url: uploadResult.secure_url,
      // };
    }

    const post = await Post.create({
      user: userId,
      profile: profileId,
      title,
      description,
      image: imageData,
    });

    return res.status(201).json({ message: "Post created successfully" });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Sever Error, failed to create post!",
      error: err,
    });
  }
};

//Get All Posts Controller
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "username")
      .populate("profile", "fullName profilePicture headLine")
      .populate("comments.user", "username")
      .populate("comments.profile", "fullName profilePicture headLine");

    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error, fail to fetch posts data",
      error: err,
    });
  }
};

//Get User Post Controller
export const getUserPosts = async (req, res) => {
  try {
    const { id: userId } = req.params;
    const posts = await Post.find({ user: userId })
      .populate("user", "username")
      .populate("profile", "fullName profilePicture headLine")
      .populate("comments.user", "username")
      .populate("comments.profile", "fullName profilePicture headLine")
      .sort({ createdAt: -1 });

    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error, fail to fetch user posts data",
      error: err,
    });
  }
};

//Like/Unlike Post Controller
export const likeOrUnlikePost = async (req, res) => {
  try {
    const { id: postId } = req.params;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const userId = req.user._id;
    const isLiked = post.likes.includes(userId);

    if (isLiked) {
      post.likes.pull(userId);
    } else {
      post.likes.push(userId);
    }
    await post.save();

    return res
      .status(200)
      .json({ message: isLiked ? "Post unliked" : "Post liked" });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error, fail to like/unlike post",
      error: err,
    });
  }
};

//Add Comment Controller
export const addComment = async (req, res) => {
  try {
    const { id: postId } = req.params;
    const { text } = req.body;
    const userId = req.user._id;
    const profile = await Profile.findOne({ user: userId });

    if (!profile) {
      return res.status(400).json({ message: "User Profile not found" });
    }

    const profileId = profile._id;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.comments.push({ user: userId, profile: profileId, text });
    await post.save();

    return res.status(200).json({ message: "Comment added to the Post" });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error, fail to add comment on post",
      error: err,
    });
  }
};

//Delete Post Controller
export const deletePost = async (req, res) => {
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

    if (post.image?.publicId) {
      await cloudinary.uploader.destroy(post.image.publicId);
    }

    await post.deleteOne();

    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error, fail to delete post",
      error: err,
    });
  }
};
