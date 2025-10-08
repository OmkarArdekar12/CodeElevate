import mongoose from "mongoose";

const Schema = mongoose.Schema;

const profileSchema = Schema({
  fullName: {
    type: String,
    required: true,
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
  },
  domain: {
    type: String,
  },

  tags: {
    type: [String],
    default: ["", "", "", "", ""],
  },

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
    codechef: String,
    geeksforgeeks: String,
    hackerrank: String,
  },
  socials: {
    linkedin: String,
    email: String,
    youtube: String,
    discord: String,
    stackoverflow: String,
    facebook: String,
    instagram: String,
    twitterx: String,
    telegram: String,
    others: String,
  },

  showStats: {
    type: Boolean,
    default: false,
  },

  education: {
    degree: String,
    cgpa: {
      type: Number,
      default: null,
    },
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
