import jwt from "jsonwebtoken";

const auth2FASetup = (req, res, next) => {
  try {
    const user = req.user;
    const authHeader = req.headers.authorization;

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authorization token missing or invalid format",
      });
    }

    const token = authHeader.split(" ")[1];
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ message: "Token expired or invalid" });
    }

    if (decoded.userId?.toString() !== user._id.toString()) {
      return res.status(403).json({
        message: "Access denied: Two-Factor-Authentication-(2FA) not verified",
      });
    }

    if (decoded.scope === "2fa-setup") {
      if (!["enable", "reset"].includes(decoded.purpose)) {
        return res.status(403).json({ message: "Invalid setup token" });
      }
      req.setupPurpose = decoded.purpose;
      return next();
    }

    if (!user.isMfaActive && user.email) {
      req.setupPurpose = "enable";
      return next();
    }

    return res.status(403).json({
      code: "EMAIL_VERIFICATION_REQUIRED",
      message: "Verify your email with an OTP before setting up 2FA.",
    });
  } catch (err) {
    return res.status(500).json({
      error: "Error in authorizing 2FA setup",
      message: err.message,
    });
  }
};

export default auth2FASetup;
