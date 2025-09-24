import { profileValidationSchema } from "../validations/profileValidation";

export const validateProfile = (req, res, next) => {
  const { error } = profileValidationSchema.validate(req.body, {
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
