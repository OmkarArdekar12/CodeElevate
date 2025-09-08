import mongoose from "mongoose";
import passport from "passport";
import userSchema from "../schemas/userSchema.js";

const User = mongoose.model("User", userSchema);

export default User;

// import mongoose from "mongoose";
// import passport from "passport";
// import userSchema from "../schemas/userSchema.js";

// const User = mongoose.model("User", userSchema);

// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// export default User;
