import express from "express";
import auth from "../middlewares/auth.js";
import verifyAuth from "../middlewares/verifyAuth.js";
import auth2FA from "../middlewares/auth2FA.js";
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
router.post("/follow/:id", auth, verifyAuth, auth2FA, followUser);

//Unfollow Route
router.post("/unfollow/:id", auth, verifyAuth, auth2FA, unfollowUser);

//Connect Route
router.post("/connect/:id", auth, verifyAuth, auth2FA, sendConnectRequest);

//Connect Respond Route
router.post(
  "/connect/response/:id",
  auth,
  verifyAuth,
  auth2FA,
  respondConnectRequest
);

//Unconnect Route
router.post("/unconnect/:id", auth, verifyAuth, auth2FA, unconnectUser);

//Check Connection Status Route
router.get("/:id/status", auth, verifyAuth, auth2FA, checkConnectionStatus);

export default router;
