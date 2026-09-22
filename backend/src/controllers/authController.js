import bcrypt from "bcryptjs";
import crypto from "crypto";
import speakeasy from "speakeasy";
import qrCode from "qrcode";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import Profile from "../models/profile.js";
import Otp from "../models/otp.js";
import { sendOtpEmail } from "../utils/sendEmail.js";
import { emailSchema } from "../validations/userValidations.js";

const OTP_PURPOSES = ["enable", "link-email", "reset"];
const OTP_TTL_MS = 10 * 60 * 1000;
const OTP_RESEND_COOLDOWN_MS = 60 * 1000;
const OTP_MAX_ATTEMPTS = 5;
const SETUP_WINDOW_MS = 15 * 60 * 1000;

const issueToken2FA = (user) =>
  jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

const saveSession = (req) =>
  new Promise((resolve, reject) =>
    req.session.save((err) => (err ? reject(err) : resolve())),
  );

const generateOtp = () => crypto.randomInt(100000, 1000000).toString();

const hashOtp = (otp, userId, purpose) =>
  crypto
    .createHmac("sha256", process.env.JWT_SECRET)
    .update(`${userId}:${purpose}:${otp}`)
    .digest("hex");

const safeEqual = (a, b) => {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  return bufA.length === bufB.length && crypto.timingSafeEqual(bufA, bufB);
};

const maskEmail = (email) => {
  const [name, domain] = email.split("@");
  return `${name.slice(0, 2)}${"*".repeat(Math.max(name.length - 2, 1))}@${domain}`;
};

const isSetupAllowed = (req, user) => {
  const win = req.session.mfaSetup;
  if (win && win.exp > Date.now()) return true;
  return !user.isMfaActive && !!user.email && !!req.session.isVerified;
};

const emailTakenByAnother = async (userId, email) =>
  !!(await User.findOne({
    _id: { $ne: userId },
    $or: [{ email }, { normalizedUsername: email }],
  }).select("_id"));

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and Password fields must be Required" });
    }

    const cleanUsername = username.trim();
    const normalizedUsername = cleanUsername.toLowerCase();

    if (cleanUsername.includes("@")) {
      return res
        .status(400)
        .json({ message: "Username cannot contain the '@' character." });
    }

    let isUserExist = await User.findOne({ normalizedUsername });
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
      username: cleanUsername,
      normalizedUsername: normalizedUsername,
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

export const login = async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  try {
    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ message: "Login failed", error: err });
      }

      const mfaRequired = !!user.isMfaActive;

      req.session.isVerified = !mfaRequired;
      delete req.session.mfaSetup;

      req.session.save((saveErr) => {
        if (saveErr) {
          return res.status(500).json({
            message: "Session save failed in login.",
            error: saveErr,
          });
        }

        const payload = {
          message: "User logged in successfully",
          username: user.username,
          userId: user._id,
          isMfaActive: mfaRequired,
          hasEmail: !!user.email,
        };
        if (!mfaRequired) {
          payload.token2FA = issueToken2FA(user);
        }
        return res.status(200).json(payload);
      });
    });
  } catch (err) {
    return res.status(500).json({ message: "Login failed", error: err });
  }
};

export const authStatus = async (req, res) => {
  if (req.user) {
    return res.status(200).json({
      message: "User logged in successfully",
      username: req.user.username,
      userId: req.user._id,
      isMfaActive: req.user.isMfaActive,
      isVerified: !!req.session.isVerified,
      email: req.user.email || null,
    });
  } else {
    return res.status(401).json({ message: "Unauthorized user!" });
  }
};

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
        res.clearCookie("codeelevate.sid");
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

export const sendEmailOtp = async (req, res) => {
  try {
    const user = req.user;
    const { purpose } = req.body;

    if (!OTP_PURPOSES.includes(purpose)) {
      return res.status(400).json({ message: "Invalid OTP purpose" });
    }

    let targetEmail;

    if (purpose === "reset") {
      if (!user.isMfaActive) {
        return res
          .status(400)
          .json({ message: "Two-factor authentication is not enabled." });
      }
      if (!user.email) {
        return res.status(400).json({
          code: "EMAIL_NOT_LINKED",
          message:
            "No verified email is linked to this account, so 2FA can't be reset by email. Verify with your authenticator app and add an email in Settings.",
        });
      }
      targetEmail = user.email;
    } else {
      if (!req.session.isVerified) {
        return res
          .status(403)
          .json({ message: "Please complete login verification first." });
      }
      if (purpose === "enable" && user.isMfaActive) {
        return res
          .status(400)
          .json({ message: "Two-factor authentication is already enabled." });
      }

      const { error, value } = emailSchema.validate(req.body.email);
      if (error) {
        return res
          .status(400)
          .json({ message: "Please enter a valid email address." });
      }
      targetEmail = value;

      if (await emailTakenByAnother(user._id, targetEmail)) {
        return res.status(409).json({
          message: "This email is already linked to another account.",
        });
      }
    }

    const existing = await Otp.findOne({ user: user._id, purpose });
    if (existing) {
      const wait =
        OTP_RESEND_COOLDOWN_MS - (Date.now() - existing.lastSentAt.getTime());
      if (wait > 0) {
        return res.status(429).json({
          message: `Please wait ${Math.ceil(wait / 1000)}s before requesting another OTP.`,
          retryAfter: Math.ceil(wait / 1000),
        });
      }
    }

    const otp = generateOtp();
    await Otp.findOneAndUpdate(
      { user: user._id, purpose },
      {
        $set: {
          email: targetEmail,
          otpHash: hashOtp(otp, user._id, purpose),
          attempts: 0,
          lastSentAt: new Date(),
          expiresAt: new Date(Date.now() + OTP_TTL_MS),
        },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );

    try {
      await sendOtpEmail({ to: targetEmail, otp, purpose });
    } catch (mailErr) {
      console.error(
        "OTP email failed:",
        mailErr?.response?.data || mailErr.message,
      );
      await Otp.deleteOne({ user: user._id, purpose });
      return res.status(502).json({
        message: "Couldn't send the email right now. Please try again shortly.",
      });
    }

    return res.status(200).json({
      message: `OTP sent to ${maskEmail(targetEmail)}`,
      maskedEmail: maskEmail(targetEmail),
      expiresInSeconds: OTP_TTL_MS / 1000,
      resendAfterSeconds: OTP_RESEND_COOLDOWN_MS / 1000,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error in sending email OTP",
      error: err.message,
    });
  }
};

export const verifyEmailOtp = async (req, res) => {
  try {
    const user = req.user;
    const { purpose, otp } = req.body;

    if (!OTP_PURPOSES.includes(purpose)) {
      return res.status(400).json({ message: "Invalid OTP purpose" });
    }
    if (!/^\d{6}$/.test(String(otp || ""))) {
      return res.status(400).json({ message: "Enter the 6-digit code." });
    }

    if (purpose === "reset") {
      if (!user.isMfaActive) {
        return res
          .status(400)
          .json({ message: "Two-factor authentication is not enabled." });
      }
    } else {
      if (!req.session.isVerified) {
        return res
          .status(403)
          .json({ message: "Please complete login verification first." });
      }
      if (purpose === "enable" && user.isMfaActive) {
        return res
          .status(400)
          .json({ message: "Two-factor authentication is already enabled." });
      }
    }

    const record = await Otp.findOne({ user: user._id, purpose });
    if (!record || record.expiresAt.getTime() < Date.now()) {
      if (record) await Otp.deleteOne({ _id: record._id });
      return res.status(400).json({
        message: "OTP expired or not requested. Please request a new one.",
      });
    }

    if (record.attempts >= OTP_MAX_ATTEMPTS) {
      await Otp.deleteOne({ _id: record._id });
      return res.status(429).json({
        message: "Too many wrong attempts. Please request a new OTP.",
      });
    }

    const isMatch = safeEqual(record.otpHash, hashOtp(otp, user._id, purpose));
    if (!isMatch) {
      record.attempts += 1;
      await record.save();
      const left = OTP_MAX_ATTEMPTS - record.attempts;
      if (left <= 0) {
        await Otp.deleteOne({ _id: record._id });
        return res.status(429).json({
          message: "Too many wrong attempts. Please request a new OTP.",
        });
      }
      return res
        .status(400)
        .json({ message: `Invalid OTP. ${left} attempt(s) left.` });
    }

    await Otp.deleteOne({ _id: record._id });

    if (purpose !== "reset") {
      if (await emailTakenByAnother(user._id, record.email)) {
        return res.status(409).json({
          message: "This email is already linked to another account.",
        });
      }
      user.email = record.email;
      try {
        await user.save();
      } catch (saveErr) {
        if (saveErr.code === 11000) {
          return res.status(409).json({
            message: "This email is already linked to another account.",
          });
        }
        throw saveErr;
      }
    }

    if (purpose !== "link-email") {
      await User.updateOne(
        { _id: user._id },
        { $unset: { twoFactorTempSecret: "" } },
      );
      req.session.mfaSetup = { purpose, exp: Date.now() + SETUP_WINDOW_MS };
      await saveSession(req);
    }

    return res.status(200).json({
      message:
        purpose === "link-email"
          ? "Email verified and linked to your account."
          : "Email verified.",
      purpose,
      email: purpose === "reset" ? undefined : user.email,
      nextStep: purpose === "link-email" ? "done" : "setup",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error in verifying email OTP",
      error: err.message,
    });
  }
};

export const setup2FA = async (req, res) => {
  try {
    const current = req.user;
    if (!current) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (!isSetupAllowed(req, current)) {
      return res.status(403).json({
        code: "EMAIL_VERIFICATION_REQUIRED",
        message: "Verify your email with an OTP before setting up 2FA.",
      });
    }

    let user = await User.findOneAndUpdate(
      { _id: current._id, twoFactorTempSecret: { $in: [null, ""] } },
      { $set: { twoFactorTempSecret: speakeasy.generateSecret().base32 } },
      { new: true },
    ).select("+twoFactorTempSecret");

    if (!user) {
      user = await User.findById(current._id).select("+twoFactorTempSecret");
    }

    const url = speakeasy.otpauthURL({
      secret: user.twoFactorTempSecret,
      label: user.username,
      issuer: "CodeElevate",
      encoding: "base32",
    });
    const qrImageUrl = await qrCode.toDataURL(url);

    return res.status(200).json({
      secret: user.twoFactorTempSecret,
      qrCode: qrImageUrl,
    });
  } catch (err) {
    return res.status(500).json({
      error: "Error in setting up two-factor-authentication-(2FA)",
      message: err.message,
    });
  }
};

export const confirm2FASetup = async (req, res) => {
  try {
    const current = req.user;
    const { token } = req.body;

    if (!current) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    if (!/^\d{6}$/.test(String(token || ""))) {
      return res.status(400).json({ message: "Enter the 6-digit code." });
    }
    if (!isSetupAllowed(req, current)) {
      return res.status(403).json({
        code: "EMAIL_VERIFICATION_REQUIRED",
        message: "Verify your email with an OTP before setting up 2FA.",
      });
    }

    const user = await User.findById(current._id).select(
      "+twoFactorTempSecret",
    );
    if (!user.twoFactorTempSecret) {
      return res
        .status(400)
        .json({ message: "Setup not started. Please reload the QR code." });
    }

    const verified = speakeasy.totp.verify({
      secret: user.twoFactorTempSecret,
      encoding: "base32",
      token,
      window: 1, // tolerate ±30s clock drift
    });
    if (!verified) {
      return res
        .status(400)
        .json({ message: "Invalid two-factor-authentication-(2FA) token" });
    }

    user.twoFactorSecret = user.twoFactorTempSecret;
    user.twoFactorTempSecret = undefined;
    user.isMfaActive = true;
    await user.save();

    req.session.isVerified = true;
    delete req.session.mfaSetup;
    await saveSession(req);

    return res.status(200).json({
      message: "Two-factor authentication is now enabled",
      username: user.username,
      userId: user._id,
      isMfaActive: true,
      isVerified: true,
      token2FA: issueToken2FA(user),
    });
  } catch (err) {
    return res.status(500).json({
      error: "Error in confirming two-factor-authentication-(2FA)",
      message: err.message,
    });
  }
};

export const verify2FA = async (req, res) => {
  try {
    const { token } = req.body;
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    if (!user.isMfaActive || !user.twoFactorSecret) {
      return res
        .status(400)
        .json({ message: "Two-factor authentication is not enabled." });
    }

    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: "base32",
      token,
      window: 1,
    });

    if (!verified) {
      return res
        .status(400)
        .json({ message: "Invalid two-factor-authentication-(2FA) token" });
    }

    req.session.isVerified = true;
    req.session.save((err) => {
      if (err) {
        return res.status(500).json({
          message: "Session save failed in verify2FA",
          error: err,
        });
      }
      return res.status(200).json({
        message: "two-factor-authentication-(2FA) successful",
        username: user.username,
        userId: user._id,
        isVerfied: true,
        token2FA: issueToken2FA(user),
      });
    });
  } catch (err) {
    return res.status(500).json({
      error: "Error in verifying two-factor-authentication-(2FA)",
      message: err.message,
    });
  }
};

export const disable2FA = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    if (!user.isMfaActive) {
      return res
        .status(400)
        .json({ message: "Two-factor authentication is already off." });
    }
    if (!req.session.isVerified) {
      return res
        .status(403)
        .json({ message: "Please complete login verification first." });
    }

    const { token } = req.body;
    if (!/^\d{6}$/.test(String(token || ""))) {
      return res.status(400).json({ message: "Enter the 6-digit code." });
    }

    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: "base32",
      token,
      window: 1,
    });
    if (!verified) {
      return res
        .status(400)
        .json({ message: "Invalid two-factor-authentication-(2FA) token" });
    }

    user.isMfaActive = false;
    user.twoFactorSecret = undefined;
    user.twoFactorTempSecret = undefined;
    await user.save();

    return res.status(200).json({
      message: "Two-factor authentication has been turned off.",
      isMfaActive: false,
    });
  } catch (err) {
    return res.status(500).json({
      error: "Error in disabling two-factor-authentication-(2FA)",
      message: err.message,
    });
  }
};

// import bcrypt from "bcryptjs";
// import speakeasy from "speakeasy";
// import qrCode from "qrcode";
// import jwt from "jsonwebtoken";
// import User from "../models/user.js";
// import Profile from "../models/profile.js";

// //Register Controller
// export const register = async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     if (!username || !password) {
//       return res
//         .status(400)
//         .json({ message: "Username and Password fields must be Required" });
//     }

//     const cleanUsername = username.trim();
//     const normalizedUsername = cleanUsername.toLowerCase();
//     let isUserExist = await User.findOne({ normalizedUsername });
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
//       username: cleanUsername,
//       normalizedUsername: normalizedUsername,
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
//   } catch (err) {
//     return res.status(500).json({
//       message: "Error: User Registration Failed!",
//       error: err,
//     });
//   }
// };

// //Login Controller
// export const login = async (req, res) => {
//   const user = req.user;

//   if (!user) {
//     return res.status(401).json({ message: "Invalid credentials" });
//   }

//   try {
//     req.login(user, (err) => {
//       if (err) {
//         return res.status(500).json({ message: "Login failed", error: err });
//       }

//       req.session.save((saveErr) => {
//         if (saveErr) {
//           return res.status(500).json({
//             message: "Session save failed in login.",
//             error: saveErr,
//           });
//         }

//         return res.status(200).json({
//           message: "User logged in successfully",
//           username: req.user.username,
//           userId: req.user._id,
//           isMfaActive: req.user.isMfaActive,
//         });
//       });
//     });
//   } catch (err) {
//     return res.status(500).json({ message: "Login failed", error: err });
//   }
// };

// //AuthStatus Controller
// export const authStatus = async (req, res) => {
//   if (req.user) {
//     return res.status(200).json({
//       message: "User logged in successfully",
//       username: req.user.username,
//       userId: req.user._id,
//       isMfaActive: req.user.isMfaActive,
//     });
//   } else {
//     return res.status(401).json({ message: "Unauthorized user!" });
//   }
// };

// //Logout Controller
// export const logout = async (req, res, next) => {
//   try {
//     if (!req.user) {
//       return res.status(401).json({ message: "Unauthorized user!" });
//     }
//     req.logout((err) => {
//       if (err) {
//         return next(err);
//       }
//       req.session.destroy((err) => {
//         if (err) {
//           return next(err);
//         }
//         //Clear cookie
//         res.clearCookie("codeelevate.sid"); //sessionId
//         return res.status(200).json({ message: "Logged out successfully" });
//       });
//     });
//   } catch (err) {
//     return res.status(500).json({
//       error: "Error in logging-out",
//       message: err,
//     });
//   }
// };

// //Setup2FA Controller
// export const setup2FA = async (req, res) => {
//   try {
//     //console.log("The req.user is: ", req.user);
//     const user = req.user;
//     if (!user) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }
//     const secret = speakeasy.generateSecret();
//     // console.log("The secret object is: ", secret); //secret object
//     user.twoFactorSecret = secret.base32;
//     user.isMfaActive = true;
//     await user.save();
//     const url = speakeasy.otpauthURL({
//       secret: secret.base32,
//       label: user.username,
//       // issuer: "www.omkarardekar.com", //issuerName: projectLink
//       issuer: "CodeElevate",
//       encoding: "base32",
//     });
//     const qrImageUrl = await qrCode.toDataURL(url);
//     return res.status(200).json({
//       secret: secret.base32,
//       qrCode: qrImageUrl,
//     });
//   } catch (err) {
//     return res.status(500).json({
//       error: "Error in setting up two-factor-authentication-(2FA)",
//       message: err,
//     });
//   }
// };

// //Verify2FA Controller
// export const verify2FA = async (req, res) => {
//   try {
//     const { token } = req.body;
//     // console.log(token);
//     const user = req.user;

//     if (!user) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const verified = speakeasy.totp.verify({
//       secret: user.twoFactorSecret,
//       encoding: "base32",
//       token,
//     });

//     if (verified) {
//       req.session.isVerified = true;

//       req.session.save((err) => {
//         if (err) {
//           return res
//             .statue(500)
//             .json({ message: "Session save failed in verify2FA", error: err });
//         }

//         const token2FA = jwt.sign(
//           { userId: user._id },
//           process.env.JWT_SECRET,
//           {
//             expiresIn: "7d",
//           },
//         );

//         return res.status(200).json({
//           message: "two-factor-authentication-(2FA) successful",
//           username: user.username,
//           userId: user._id,
//           isVerfied: true,
//           token2FA: token2FA,
//         });
//       });
//     } else {
//       return res
//         .status(400)
//         .json({ message: "Invalid two-factor-authentication-(2FA) token" });
//     }
//   } catch (err) {
//     return res.status(500).json({
//       error: "Error in verifying two-factor-authentication-(2FA)",
//       message: err,
//     });
//   }
// };

// //Reset2FA Controller
// export const reset2FA = async (req, res) => {
//   try {
//     const user = req.user;
//     user.twoFactorSecret = "";
//     user.isMfaActive = false;
//     await user.save();
//     return res
//       .status(200)
//       .json({ message: "two-factor-authentication-(2FA) reset successful" });
//   } catch (err) {
//     return res.status(500).json({
//       message: "Error resetting two-factor-authentication-(2FA)",
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
// //Logout Controller
// export const logout = async (req, res, next) => {
//   try {
//     if (!req.user) {
//       return res.status(401).json({ message: "Unauthorized user!" });
//     }
//     req.logout((err) => {
//       if (err) {
//         return next(err);
//       }
//       req.session.destroy((err) => {
//         if (err) {
//           return next(err);
//         }
//         //Clear cookie
//         res.clearCookie("connect.sid"); //default sessionId
//         return res.status(200).json({ message: "Logged out successfully" });
//       });
//     });
//   } catch (err) {
//     return res.status(500).json({
//       error: "Error in logging-out",
//       message: err,
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
