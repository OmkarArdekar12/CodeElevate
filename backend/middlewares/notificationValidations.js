import { notificationValidationSchema } from "../validations/notificationValidations";

export const validateNotification = (req, res, next) => {
  const { error } = notificationValidationSchema.validate(req.body, {
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
