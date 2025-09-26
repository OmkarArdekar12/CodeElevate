const auth = (req, res, next) => {
  console.log(req.user);
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ message: "Unauthorized User!" });
};

export default auth;

// import jwt from "jsonwebtoken";
// import User from "../models/user.js";

// const auth = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res
//         .status(401)
//         .json({ message: "Unauthorized: No token provided" });
//     }

//     const token = authHeader.split(" ")[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // attach user to request
//     req.user = await User.findById(decoded.id || decoded._id).select(
//       "-password"
//     );

//     if (!req.user) {
//       return res.status(401).json({ message: "Unauthorized: User not found" });
//     }

//     next();
//   } catch (err) {
//     return res
//       .status(401)
//       .json({ message: "Unauthorized", error: err.message });
//   }
// };

// export default auth;
