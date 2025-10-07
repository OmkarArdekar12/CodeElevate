import { ExpressError } from "../utils/ExpressError.js";

export const pageNotFoundMiddleware = (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
};

export const errorHandlerMiddleware = (err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong!" } = err;
  return res.status(statusCode).json({ message: message, error: err });
};
