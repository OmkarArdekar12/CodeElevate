import Joi from "joi";

export const notificationValidationSchema = Joi.object({
  from: Joi.string().required(), //mongo ObjectId
  to: Joi.string().required(),
  type: Joi.string()
    .valid("follow", "connect", "message", "like", "comment")
    .required(),
  message: Joi.string().min(1).max(250).required(),
});
