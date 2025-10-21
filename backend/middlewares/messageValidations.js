import mongoose from "mongoose";
import { messageValidationSchema } from "../validations/messageValidations.js";

export const validateMessage = (req, res, next) => {
  const { error } = messageValidationSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      message: "Validation failed",
      details: error.details.map((d) => d.message),
    });
  }

  next();
};
