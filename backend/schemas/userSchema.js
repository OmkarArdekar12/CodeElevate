const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passortLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },

  profilePicture: String,
  backgroundBanner: String,
  bio: String,

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

  // followers: [ObjectId],
  // following: [ObjectId],

  createdAt: Date,
  updatedAt: Date,
});

userSchema.plugin(passortLocalMongoose);

module.exports = userSchema;
