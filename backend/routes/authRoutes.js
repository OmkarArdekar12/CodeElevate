import { Router } from "express";
import passport from "passport";
import {
  register,
  login,
  logout,
  authStatus,
  setup2FA,
  verify2FA,
  reset2FA,
} from "../controllers/authControllers.js";

const router = Router();

//Registration Route
router.post("/register", register);

//Login Route
router.post("/login", passport.authenticate("local"), login);

//Authentication Route
router.get("/status", authStatus);

//Logout Route
router.post("/logout", logout);

//2FA Setup Route
router.post("/2fa/setup", setup2FA);

//2FA Verify Route
router.post("/2fa/verify", verify2FA);

//2FA Reset Route
router.post("/2fa/reset", reset2FA);

export default router;
