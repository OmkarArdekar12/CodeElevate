import bcrypt from "bcryptjs";
import User from "../models/user.js";

//Register Controller
export const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      password: hashedPassword,
      isMfaActive: false,
    });
    console.log("New User: ", user);
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({
      error: "Error: User Registration Failed!",
      message: err,
    });
  }
};

//Login Controller
export const login = async (req, res) => {
  console.log("The authenticate user is: ", req.user);
  res.status(200).json({
    message: "User logged in successfully",
    username: req.user.username,
    isMfaActive: req.user.isMfaActive,
  });
};

//AuthStatus Controller
export const authStatus = async (req, res) => {
  if (req.user) {
    res.status(200).json({
      message: "User logged in successfully",
      // username: req.user.username,
      user: req.user,
      isMfaActive: req.user.isMfaActive,
    });
  } else {
    res.status(401).json({ message: "Unauthorized user!" });
  }
};

//Logout Controller
export const logout = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized user!" });
  }
  req.logout((err) => {
    if (err) {
      return res.status(400).json({ message: "User not logged in" });
    }
    res.status(200).json({ message: "User Logout successfully" });
  });
};

//Setup2FA Controller
export const setup2FA = async (req, res) => {
  try {
  } catch (err) {}
};

//Verify2FA Controller
export const verify2FA = async () => {};

//Reset2FA Controller
export const reset2FA = async () => {};
