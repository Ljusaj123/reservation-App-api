import { StatusCodes } from "http-status-codes";

const ErrorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.status || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Something went wrong, try again later",
  };

  return res.status(customError.statusCode).json({
    success: false,
    status: customError.statusCode,
    message: customError.message,
    stack: err.stack,
  });
};

export default ErrorHandlerMiddleware;
