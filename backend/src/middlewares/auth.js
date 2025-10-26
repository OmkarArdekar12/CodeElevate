import User from "../models/user.js";

const auth = async (req, res, next) => {
  if (req.isAuthenticated() && req.user) {
    return next();
  }

  const userId = req.cookies.user_session;
  if (!userId) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  req.user = user;
  return next();
};

export default auth;
