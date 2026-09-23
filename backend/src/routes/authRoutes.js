import { Router } from "express";
import passport from "passport";
import "../config/passportConfig.js";
import {
  register,
  login,
  logout,
  authStatus,
  setup2FA,
  confirm2FASetup,
  verify2FA,
  disable2FA,
  sendEmailOtp,
  verifyEmailOtp,
} from "../controllers/authController.js";
import auth from "../middlewares/auth.js";
import verifyAuth from "../middlewares/verifyAuth.js";
import auth2FA from "../middlewares/auth2FA.js";
import auth2FASetup from "../middlewares/auth2FASetup.js";

const router = Router();

//Registration Route
router.post("/register", register);

//Login Route
router.post("/login", passport.authenticate("local"), login);

//Authentication Route
router.get("/status", auth, authStatus);

//Logout Route
router.post("/logout", auth, logout);

//Send Email OTP Route
router.post("/2fa/email/send-otp", auth, sendEmailOtp);

//Verify Email OTP Route
router.post("/2fa/email/verify-otp", auth, verifyEmailOtp);

//2FA Setup Route
router.post("/2fa/setup", auth, auth2FASetup, setup2FA);

//2FA Confirm Route
router.post("/2fa/setup/confirm", auth, auth2FASetup, confirm2FASetup);

//2FA Verify Route
router.post("/2fa/verify", auth, verify2FA);

//2FA Disable Route
router.post("/2fa/disable", auth, verifyAuth, auth2FA, disable2FA);

export default router;
