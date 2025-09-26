import bcrypt from "bcryptjs";
import speakeasy from "speakeasy";
import qrCode from "qrcode";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import Profile from "../models/profile.js";

//Register Controller
export const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      password: hashedPassword,
      isMfaActive: false,
    });
    const profile = await Profile.create({
      user: user._id,
      fullName: username,
    });

    res.status(201).json({
      username: user.username,
      userId: user._id,
      profile,
      message: "User registered successfully",
    });

    // const user = new User({
    //   username,
    //   password: hashedPassword,
    //   isMfaActive: false,
    // });
    // await user.save();
    // console.log("New User: ", user);
  } catch (err) {
    res.status(500).json({
      message: "Error: User Registration Failed!",
      error: err,
    });
  }
};

//Login Controller
export const login = async (req, res) => {
  console.log("The authenticate user is: ", req.user);
  res.status(200).json({
    message: "User logged in successfully",
    username: req.user.username,
    userId: req.user._id,
    isMfaActive: req.user.isMfaActive,
  });
};

//AuthStatus Controller
export const authStatus = async (req, res) => {
  if (req.user) {
    res.status(200).json({
      message: "User logged in successfully",
      username: req.user.username,
      userId: req.user._id,
      isMfaActive: req.user.isMfaActive,
    });
  } else {
    res.status(401).json({ message: "Unauthorized user!" });
  }
};

//Logout Controller
export const logout = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized user!" });
  }
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      //Clear cookie
      res.clearCookie("connect.sid"); //default sessionId
      res.status(200).json({ message: "Logged out successfully" });
    });
  });
};

//Setup2FA Controller
export const setup2FA = async (req, res) => {
  try {
    console.log("The req.user is: ", req.user);
    const user = req.user;
    var secret = speakeasy.generateSecret();
    console.log("The secret object is: ", secret); //secret object
    user.twoFactorSecret = secret.base32;
    user.isMfaActive = true;
    await user.save();
    const url = speakeasy.otpauthURL({
      secret: secret.base32,
      label: `${req.user.username}`,
      // issuer: "www.omkarardekar.com", //issuerName: projectLink
      issuer: "codeelevate",
      encoding: "base32",
    });
    const qrImageUrl = await qrCode.toDataURL(url);
    res.status(200).json({
      secret: secret.base32,
      qrCode: qrImageUrl,
    });
  } catch (err) {
    res.status(500).json({
      error: "Error in setting up two-factor-authentication-(2FA)",
      message: err,
    });
  }
};

//Verify2FA Controller
export const verify2FA = async (req, res) => {
  const { token } = req.body;
  console.log(token);
  const user = req.user;

  const verified = speakeasy.totp.verify({
    secret: user.twoFactorSecret,
    encoding: "base32",
    token,
  });

  if (verified) {
    const jwtToken = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1hr" }
    );
    res.status(200).json({
      message: "two-factor-authentication-(2FA) successful",
      token: jwtToken,
    });
  } else {
    res
      .status(400)
      .json({ message: "Invalid two-factor-authentication-(2FA) token" });
  }
};

//Reset2FA Controller
export const reset2FA = async (req, res) => {
  try {
    const user = req.user;
    user.twoFactorSecret = "";
    user.isMfaActive = false;
    await user.save();
    res
      .status(200)
      .json({ message: "two-factor-authentication-(2FA) reset successful" });
  } catch (err) {
    res.status(500).json({
      error: "Error resetting two-factor-authentication-(2FA)",
      message: err,
    });
  }
};
