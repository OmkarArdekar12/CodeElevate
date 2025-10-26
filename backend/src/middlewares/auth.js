const auth = (req, res, next) => {
  console.log("user", req.user);
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized User!" });
  }
  return next();
};

export default auth;
