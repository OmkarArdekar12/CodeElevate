import Joi from "joi";

export const notificationValidationSchema = Joi.object({
  from: Joi.string().required(), //mongodb ObjectId
  to: Joi.string().required(),
  type: Joi.string().valid("connect", "message").required(),
  message: Joi.string().min(1).max(250).required(),
});
