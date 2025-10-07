import express from "express";
import auth from "../middlewares/auth.js";
import {
  addComment,
  createPost,
  deletePost,
  editPost,
  getAllPosts,
  getUserPosts,
  likeOrUnlikePost,
} from "../controllers/postControllers.js";
import { validatePost, isOwner } from "../middlewares/postValidations.js";
import multer from "multer";
import { storage } from "../config/cloudConfig.js";

const upload = multer({ storage });

const router = express.Router();

//Create Post Route
router.post("/", auth, upload.single("image"), validatePost, createPost);

//Edit Post Route
router.put("/:id/edit", auth, validatePost, isOwner, editPost);

//Get All Post Route
router.get("/", getAllPosts);

//Get All User Post Route
router.get("/:id", getUserPosts);

//Like/Unlike Post Route
router.patch("/:id/like", auth, likeOrUnlikePost);

//Add Comment Post Route
router.put("/:id/comment", auth, addComment);

//Delete Comment Post Route

//Delete Post Route
router.delete("/:id", auth, isOwner, deletePost);

export default router;
