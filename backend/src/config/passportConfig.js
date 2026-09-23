import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import User from "../models/user.js";

passport.use(
  new LocalStrategy(async (identifier, password, done) => {
    try {
      const raw = String(identifier || "").trim();
      const lower = raw.toLowerCase();

      const query = lower.includes("@")
        ? {
            $or: [
              { email: lower },
              { normalizedUsername: lower },
              { username: raw },
            ],
          }
        : { $or: [{ normalizedUsername: lower }, { username: raw }] };

      const user = await User.findOne(query);
      if (!user) {
        return done(null, false, { message: "User not found!" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: "Incorrect password!" });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (_id, done) => {
  try {
    const user = await User.findById(_id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
