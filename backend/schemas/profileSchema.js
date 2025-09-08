import mongoose from "mongoose";

const Schema = mongoose.Schema;

const profileSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  email: {
    type: String,
  },
  profilePicture: {
    type: String,
    default: "",
  },
  backgroundBanner: {
    type: String,
    default: "",
  },
  headLine: {
    type: String,
    default: "",
  },
  tags: [String],
  about: {
    type: String,
    default: "",
  },

  developmentProfiles: {
    github: String,
    gitlab: String,
    portfolio: String,
  },
  competitiveProfile: {
    leetCode: String,
    codeforces: String,
    hackerrank: String,
    geekforgeeks: String,
    codeshef: String,
  },
  education: {
    degree: String,
    cgpa: Number,
    institution: String,
  },

  followers: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  following: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export default profileSchema;
