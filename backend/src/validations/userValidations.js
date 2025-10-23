import Joi from "joi";

export const userValidationSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(6).max(128).required(),
  isMfaActive: Joi.boolean().default(false),
  twoFactorSecret: Joi.string().allow(""),
});
