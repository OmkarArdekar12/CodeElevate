const verifyAuth = (req, res, next) => {
  if (req.isAuthenticated() && req.session.isVerified) {
    next();
  }
  return res.status(403).json({
    message: "Access denied: Two-Factor-Authentication-(2FA) not verified",
  });
};

export default verifyAuth;
