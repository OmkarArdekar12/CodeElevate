const auth = (req, res, next) => {
  // console.log(req.user);
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ message: "Unauthorized User!" });
};

export default auth;
