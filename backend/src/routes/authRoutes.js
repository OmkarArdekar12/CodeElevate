import { Router } from "express";
import passport from "../config/passportConfig.js";
import {
  register,
  login,
  logout,
  authStatus,
  setup2FA,
  verify2FA,
  reset2FA,
} from "../controllers/authController.js";
import auth from "../middlewares/auth.js";

const router = Router();

//Registration Route
router.post("/register", register);

//Login Route
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user)
      return res
        .status(401)
        .json({ message: info.message || "Invalid credentials" });

    req.login(user, (err) => {
      if (err)
        return res.status(500).json({ message: "Login failed", error: err });
      return res.status(200).json({
        message: "User logged in successfully",
        username: user.username,
        userId: user._id,
        isMfaActive: user.isMfaActive,
      });
    });
  })(req, res, next);
});
//Login Route
// router.post("/login", passport.authenticate("local"), login);

//Authentication Route
router.get("/status", authStatus);

//Logout Route
router.post("/logout", logout);

//2FA Setup Route
router.post("/2fa/setup", auth, setup2FA);

//2FA Verify Route
router.post("/2fa/verify", auth, verify2FA);

//2FA Reset Route
router.post("/2fa/reset", auth, reset2FA);

export default router;
