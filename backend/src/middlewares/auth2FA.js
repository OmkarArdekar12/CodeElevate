import jwt from "jsonwebtoken";

const auth2FA = (req, res, next) => {
  try {
    const user = req.user;
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message:
          "Authorization two-factor-authentication token missing or invalid format",
      });
    }

    const token2FA = authHeader.split(" ")[1];
    if (!token2FA) {
      return res
        .status(401)
        .json({ message: "Two-factor-authentication token not found" });
    }

    const decoded = jwt.verify(token2FA, process.env.JWT_SECRET);

    if (decoded.userId.toString() === user._id.toString()) {
      return next();
    }

    return res.status(403).json({
      message: "Access denied: Two-Factor-Authentication-(2FA) not verified",
    });
  } catch (err) {
    return res.status(500).json({
      error: "Error in authenticating two-factor-authentication-(2FA)",
      message: err,
    });
  }
};

export default auth2FA;
