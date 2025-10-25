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

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and Password fields must be Required" });
    }

    let isUserExist = await User.findOne({ username });
    if (isUserExist) {
      return res.status(400).json({ message: "User already exists." });
    }

    const passwordRegex = /^(?=.*[0-9])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 6 characters, contain 1 number and 1 uppercase letter",
      });
    }

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

    return res.status(201).json({
      username: user.username,
      userId: user._id,
      profile,
      message: "User registered successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error: User Registration Failed!",
      error: err,
    });
  }
};

//Login Controller
export const login = async (req, res) => {
  console.log("Login debug start");
  console.log("The authenticate user is: ", req.user);
  console.log("The authenticate user is: ", req.session);
  console.log("Login debug end");
  const user = req.user;

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  try {
    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ message: "Login failed", error: err });
      }

      return res.status(200).json({
        message: "User logged in successfully",
        username: req.user.username,
        userId: req.user._id,
        isMfaActive: req.user.isMfaActive,
      });
    });
  } catch (err) {
    return res.status(500).json({ message: "Login failed", error: err });
  }
};

//AuthStatus Controller
export const authStatus = async (req, res) => {
  if (req.user) {
    return res.status(200).json({
      message: "User logged in successfully",
      username: req.user.username,
      userId: req.user._id,
      isMfaActive: req.user.isMfaActive,
    });
  } else {
    return res.status(401).json({ message: "Unauthorized user!" });
  }
};

//Logout Controller
export const logout = async (req, res, next) => {
  try {
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
        return res.status(200).json({ message: "Logged out successfully" });
      });
    });
  } catch (err) {
    return res.status(500).json({
      error: "Error in logging-out",
      message: err,
    });
  }
};

//Setup2FA Controller
export const setup2FA = async (req, res) => {
  try {
    // console.log("The req.user is: ", req.user);
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const secret = speakeasy.generateSecret();
    // console.log("The secret object is: ", secret); //secret object
    user.twoFactorSecret = secret.base32;
    user.isMfaActive = true;
    await user.save();
    const url = speakeasy.otpauthURL({
      secret: secret.base32,
      label: user.username,
      // issuer: "www.omkarardekar.com", //issuerName: projectLink
      issuer: "CodeElevate",
      encoding: "base32",
    });
    const qrImageUrl = await qrCode.toDataURL(url);
    return res.status(200).json({
      secret: secret.base32,
      qrCode: qrImageUrl,
    });
  } catch (err) {
    return res.status(500).json({
      error: "Error in setting up two-factor-authentication-(2FA)",
      message: err,
    });
  }
};

//Verify2FA Controller
export const verify2FA = async (req, res) => {
  try {
    const { token } = req.body;
    // console.log(token);
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: "base32",
      token,
    });

    if (verified) {
      req.session.isVerified = true;

      const token2FA = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      return res.status(200).json({
        message: "two-factor-authentication-(2FA) successful",
        username: user.username,
        userId: user._id,
        isVerfied: true,
        token2FA: token2FA,
      });
    } else {
      return res
        .status(400)
        .json({ message: "Invalid two-factor-authentication-(2FA) token" });
    }
  } catch (err) {
    return res.status(500).json({
      error: "Error in verifying two-factor-authentication-(2FA)",
      message: err,
    });
  }
};

//Reset2FA Controller
export const reset2FA = async (req, res) => {
  try {
    const user = req.user;
    user.twoFactorSecret = "";
    user.isMfaActive = false;
    await user.save();
    return res
      .status(200)
      .json({ message: "two-factor-authentication-(2FA) reset successful" });
  } catch (err) {
    return res.status(500).json({
      message: "Error resetting two-factor-authentication-(2FA)",
      error: err,
    });
  }
};

// //Register Controller
// export const register = async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     if (!username || !password) {
//       return res
//         .status(400)
//         .json({ message: "Username and Password fields must be Required" });
//     }

//     let isUserExist = await User.findOne({ username });
//     if (isUserExist) {
//       return res.status(400).json({ message: "User already exists." });
//     }

//     const passwordRegex = /^(?=.*[0-9])(?=.*[A-Z]).{6,}$/;
//     if (!passwordRegex.test(password)) {
//       return res.status(400).json({
//         message:
//           "Password must be at least 6 characters, contain 1 number and 1 uppercase letter",
//       });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await User.create({
//       username,
//       password: hashedPassword,
//       isMfaActive: false,
//     });
//     const profile = await Profile.create({
//       user: user._id,
//       fullName: username,
//     });

//     return res.status(201).json({
//       username: user.username,
//       userId: user._id,
//       profile,
//       message: "User registered successfully",
//     });

//     // const user = new User({
//     //   username,
//     //   password: hashedPassword,
//     //   isMfaActive: false,
//     // });
//     // await user.save();
//     // console.log("New User: ", user);
//   } catch (err) {
//     return res.status(500).json({
//       message: "Error: User Registration Failed!",
//       error: err,
//     });
//   }
// };
// //Register Controller
// export const register = async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     if (!username || !password) {
//       return res
//         .status(400)
//         .json({ message: "Username and Password fields must be Required" });
//     }
//     let isUserExist = await User.findOne({ username });
//     if (isUserExist) {
//       return res.status(400).json({ message: "User already exists." });
//     }
//     const passwordRegex = /^(?=.*[0-9])(?=.*[A-Z]).{6,}$/;
//     if (!passwordRegex.test(password)) {
//       return res.status(400).json({
//         message:
//           "Password must be at least 6 characters, contain 1 number and 1 uppercase letter",
//       });
//     }
//     const registeredUser = await User.register(
//       new User({ username, isMfaActive: false }),
//       password
//     );
//     const profile = await Profile.create({
//       user: registeredUser._id,
//       fullName: username,
//     });
//     req.login(registeredUser, (err) => {
//       if (err) {
//         return res.status(500).json({
//           message: "Registration successful but auto-login failed",
//         });
//       }

//       return res.status(201).json({
//         message: "User registered successfully",
//         username: registeredUser.username,
//         userId: registeredUser._id,
//         isMfaActive: registeredUser.isMfaActive,
//       });
//     });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({
//       message: "Error: User Registration Failed!",
//       error: err,
//     });
//   }
// };
// //Register Controller
// export const register = async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await User.create({
//       username,
//       password: hashedPassword,
//       isMfaActive: false,
//     });
//     const profile = await Profile.create({
//       user: user._id,
//       fullName: username,
//     });
//     return res.status(201).json({
//       username: user.username,
//       userId: user._id,
//       profile,
//       message: "User registered successfully",
//     });
//     // const user = new User({
//     //   username,
//     //   password: hashedPassword,
//     //   isMfaActive: false,
//     // });
//     // await user.save();
//     // console.log("New User: ", user);
//   } catch (err) {
//     return res.status(500).json({
//       message: "Error: User Registration Failed!",
//       error: err,
//     });
//   }
// };

// //Verify2FA Controller
// //-JWT Auth verify
// export const verify2FA = async (req, res) => {
//   const { token } = req.body;
//   console.log(token);
//   const user = req.user;

//   const verified = speakeasy.totp.verify({
//     secret: user.twoFactorSecret,
//     encoding: "base32",
//     token,
//   });

//   if (verified) {
//     const jwtToken = jwt.sign(
//       { username: user.username },
//       process.env.JWT_SECRET,
//       { expiresIn: "1hr" }
//     );
//     return res.status(200).json({
//       message: "two-factor-authentication-(2FA) successful",
//       token: jwtToken,
//     });
//   } else {
//     return res
//       .status(400)
//       .json({ message: "Invalid two-factor-authentication-(2FA) token" });
//   }
// };
