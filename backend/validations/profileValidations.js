import Joi from "joi";

export const profileValidationSchema = Joi.object({
  fullName: Joi.string().max(100).allow(""),

  user: Joi.string().required(), //ObjectId as a string

  profilePicture: Joi.string().uri().allow(""),
  backgroundBanner: Joi.string().uri().allow(""),

  headLine: Joi.string().max(150).allow(""),

  role: Joi.string().default("Explorer"),
  domain: Joi.string().default("General"),

  tags: Joi.array().items(Joi.string().max(5)),

  about: Joi.string().max(1000).allow(""),

  developmentProfiles: Joi.object({
    github: Joi.string().allow(""),
    gitlab: Joi.string().allow(""),
    portfolio: Joi.string().allow(""),
  }),

  competitiveProfiles: Joi.object({
    leetCode: Joi.string().allow(""),
    codeforces: Joi.string().allow(""),
    atCoder: Joi.string().allow(""),
    codechef: Joi.string().allow(""),
    geeksforgeeks: Joi.string().allow(""),
    hackerrank: Joi.string().allow(""),
  }),

  socials: Joi.object({
    linkedin: Joi.string().uri().allow(""),
    email: Joi.string().email().allow(""),
    youtube: Joi.string().uri().allow(""),
    discord: Joi.string().uri().allow(""),
    stackoverflow: Joi.string().uri().allow(""),
    facebook: Joi.string().uri().allow(""),
    instagram: Joi.string().uri().allow(""),
    twitterx: Joi.string().uri().allow(""),
    telegram: Joi.string().uri().allow(""),
    others: Joi.string().uri().allow(""),
  }),

  showStats: Joi.boolean().default(false),

  education: Joi.object({
    degree: Joi.string().max(100).allow(""),
    cgpa: Joi.number().min(0).max(10).allow(null),
    institution: Joi.string().max(150).allow(""),
  }),

  followers: Joi.array().items(Joi.string()),
  following: Joi.array().items(Joi.string()),
});
