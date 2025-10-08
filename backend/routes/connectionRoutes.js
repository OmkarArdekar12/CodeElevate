import express from "express";
import auth from "../middlewares/auth.js";
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
router.post("/follow/:id", auth, followUser);

//Unfollow Route
router.post("/unfollow/:id", auth, unfollowUser);

//Connect Route
router.post("/connect/:id", auth, sendConnectRequest);

//Connect Respond Route
router.post("/connect/response/:id", auth, respondConnectRequest);

//Unconnect Route
router.post("/unconnect/:id", auth, unconnectUser);

//Check Connection Status Route
router.get("/:id/status", auth, checkConnectionStatus);

export default router;
