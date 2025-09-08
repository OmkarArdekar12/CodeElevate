import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    isMfaActive: {
      type: Boolean,
    },
    twoFactorSecret: {
      type: String,
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
  },
  {
    timestamps: true,
  }
);

export default userSchema;

// import mongoose from "mongoose";
// import passportLocalMongoose from "passport-local-mongoose";

// const Schema = mongoose.Schema;

// const userSchema = new Schema({
//   email: {
//     type: String,
//     required: true,
//   },

//   profilePicture: {
//     type: String,
//     default: "",
//   },
//   backgroundBanner: {
//     type: String,
//     default: "",
//   },
//   headLine: {
//     type: String,
//     default: "",
//   },
//   tags: [String],
//   about: {
//     type: String,
//     default: "",
//   },

//   developmentProfiles: {
//     github: String,
//     gitlab: String,
//     portfolio: String,
//   },
//   competitiveProfile: {
//     leetCode: String,
//     codeforces: String,
//     hackerrank: String,
//     geekforgeeks: String,
//     codeshef: String,
//   },
//   education: {
//     degree: String,
//     cgpa: Number,
//     institution: String,
//   },

//   followers: {
//     type: Schema.Types.ObjectId,
//     ref: "User",
//   },
//   following: {
//     type: Schema.Types.ObjectId,
//     ref: "User",
//   },

//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// userSchema.plugin(passportLocalMongoose);

// export default userSchema;
