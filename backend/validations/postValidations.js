import Joi from "joi";

export const postValidationSchema = Joi.object({
  title: Joi.string().max(50).required(),
  description: Joi.string().max(500).allow(""),
});
