import express from "express";
import auth from "../middlewares/auth";
import {
  followUser,
  respondConnectRequest,
  sendConnectRequest,
  unfollowUser,
} from "../controllers/connectionControllers";

const router = express.Router();

//Follow Route
router.post("/follow/:id", auth, followUser);

//Unfollow Route
router.post("/unfollow/:id", auth, unfollowUser);

//Connect Route
router.post("/connect/:id", auth, sendConnectRequest);

//Connect Respond Route
router.post("/connect/response/:id", auth, respondConnectRequest);

export default router;
