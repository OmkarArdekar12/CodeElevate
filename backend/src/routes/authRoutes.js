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
  sendEmailOtp,
  verifyEmailOtp,
} from "../controllers/authController.js";
import auth from "../middlewares/auth.js";

const router = Router();

//Registration Route
router.post("/register", register);

//Login Route (username or email + password)
router.post("/login", passport.authenticate("local"), login);

//Authentication Route
router.get("/status", authStatus);

//Logout Route
router.post("/logout", logout);

//Email OTP (enable 2FA / link email / reset 2FA)
router.post("/2fa/email/send-otp", auth, sendEmailOtp);
router.post("/2fa/email/verify-otp", auth, verifyEmailOtp);

//2FA Setup (returns QR) and Confirm (activates)
router.post("/2fa/setup", auth, setup2FA);
router.post("/2fa/setup/confirm", auth, confirm2FASetup);

//2FA Verify Route (login step when 2FA is on)
router.post("/2fa/verify", auth, verify2FA);

export default router;

// import { Router } from "express";
// import passport from "passport";
// import LocalStrategy from "passport-local";
// import "../config/passportConfig.js";
// import {
//   register,
//   login,
//   logout,
//   authStatus,
//   setup2FA,
//   verify2FA,
//   reset2FA,
// } from "../controllers/authController.js";
// import auth from "../middlewares/auth.js";

// const router = Router();

// //Registration Route
// router.post("/register", register);

// //Login Route
// router.post("/login", passport.authenticate("local"), login);

// //Authentication Route
// router.get("/status", authStatus);

// //Logout Route
// router.post("/logout", logout);

// //2FA Setup Route
// router.post("/2fa/setup", auth, setup2FA);

// //2FA Verify Route
// router.post("/2fa/verify", auth, verify2FA);

// //2FA Reset Route
// router.post("/2fa/reset", auth, reset2FA);

// export default router;
