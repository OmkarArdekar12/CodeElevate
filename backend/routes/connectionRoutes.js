import express from "express";
import auth from "../middlewares/auth.js";
import verifyAuth from "../middlewares/verifyAuth.js";
import {
  followUser,
  respondConnectRequest,
  sendConnectRequest,
  unfollowUser,
  checkConnectionStatus,
  unconnectUser,
} from "../controllers/connectionController.js";

const router = express.Router();

//Follow Route
router.post("/follow/:id", auth, verifyAuth, followUser);

//Unfollow Route
router.post("/unfollow/:id", auth, verifyAuth, unfollowUser);

//Connect Route
router.post("/connect/:id", auth, verifyAuth, sendConnectRequest);

//Connect Respond Route
router.post("/connect/response/:id", auth, verifyAuth, respondConnectRequest);

//Unconnect Route
router.post("/unconnect/:id", auth, verifyAuth, unconnectUser);

//Check Connection Status Route
router.get("/:id/status", auth, verifyAuth, checkConnectionStatus);

export default router;
