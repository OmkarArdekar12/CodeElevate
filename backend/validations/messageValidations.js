import Joi from "joi";

export const messageValidationSchema = Joi.object({
  senderId: Joi.string().required(),
  receiverId: Joi.string().required(),
  text: Joi.string().allow("").max(2000),
  image: Joi.string().allow("").allow(null).optional(),
});

// export const messageValidationSchema = Joi.object({
//   senderId: Joi.string().required().messages({
//     "string.empty": "Sender ID is required",
//   }),
//   receiverId: Joi.string().required().messages({
//     "string.empty": "Receiver ID is required",
//   }),
//   text: Joi.string().allow("").max(2000).messages({
//     "string.max": "Message cannot exceed 2000 characters",
//   }),
//   image: Joi.object({
//     publicId: Joi.string().allow(""),
//     url: Joi.string().uri().allow(""),
//   }).optional(),
// });
