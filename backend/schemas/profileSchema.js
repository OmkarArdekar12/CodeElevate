import mongoose from "mongoose";

const Schema = mongoose.Schema;

const profileSchema = Schema({
  fullName: {
    type: String,
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
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

  role: {
    type: String,
    default: "Explorer",
  },
  domain: {
    type: String,
    default: "General",
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
  competitiveProfiles: {
    leetCode: String,
    codeforces: String,
    atCoder: String,
    hackerrank: String,
    geekforgeeks: String,
    codechef: String,
  },
  socials: {
    linkedin: String,
    email: String,
    youtube: String,
    facebook: String,
    instagram: String,
    twitter: String,
    thread: String,
  },

  education: {
    degree: String,
    cgpa: Number,
    institution: String,
  },

  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

export default profileSchema;
