import express from "express";
import auth from "../middlewares/auth.js";
import {
  addComment,
  createPost,
  deletePost,
  getAllPosts,
  getUserPosts,
  likeOrUnlikePost,
} from "../controllers/postControllers.js";
import { validatePost, isOwner } from "../middlewares/postValidations.js";

const router = express.Router();

//Create Post Route
router.post("/", auth, validatePost, createPost);

//Get All Post Route
router.get("/", getAllPosts);

//Get All User Post Route
router.get("/:id", getUserPosts);

//Like/Unlike Post Route
router.put("/:id/like", auth, likeOrUnlikePost);

//Comment Post Route
router.post("/:id/comment", auth, addComment);

//Delete Post Route
router.delete("/:id", auth, isOwner, deletePost);
