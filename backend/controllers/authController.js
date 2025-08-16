import bcrypt from "bcryptjs";
import User from "../models/user.js";

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

export const login = async (req, res) => {
  console.log("The authenticate user is: ", req.user);
  res.status(200).json({
    message: "User logged in successfully",
    username: req.user.username,
    isMfaActive: req.user.isMfaActive,
  });
};

export const authStatus = async () => {};

export const logout = async () => {};

export const setup2FA = async () => {};

export const verify2FA = async () => {};

export const reset2FA = async () => {};
