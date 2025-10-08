import express from "express";
import auth from "../middlewares/auth.js";
import {
  addComment,
  createPost,
  deletePost,
  destroyComment,
  editPost,
  getAllPosts,
  getPost,
  getUserPosts,
  likeOrUnlikePost,
} from "../controllers/postController.js";
import {
  validatePost,
  isOwner,
  isCommentOwner,
} from "../middlewares/postValidations.js";
import multer from "multer";
import { storage } from "../config/cloudConfig.js";

const upload = multer({ storage });

const router = express.Router();

//Create Post Route
router.post("/", auth, upload.single("image"), validatePost, createPost);

//Get All Post Route
router.get("/", getAllPosts);

//Get Post Route
router.get("/:id/data", getPost);

//Get User All Post Route
router.get("/:id", getUserPosts);

//Like/Unlike Post Route
router.patch("/:id/like", auth, likeOrUnlikePost);

//Add Comment Post Route
router.put("/:id/comment", auth, addComment);

//Delete Comment Post Route
router.delete(
  "/:postId/comment/:commentId",
  auth,
  isCommentOwner,
  destroyComment
);

//Edit Post Route
router.put("/:id/edit", auth, validatePost, isOwner, editPost);

//Delete Post Route
router.delete("/:id", auth, isOwner, deletePost);

export default router;
