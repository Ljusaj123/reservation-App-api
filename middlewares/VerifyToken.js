import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

export const VerifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    const error = new Error();
    error.status = StatusCodes.UNAUTHORIZED;
    error.message = "You are not authenticated";
    throw error;
  }
  jwt.verify(token, "secret", (err, user) => {
    if (err) {
      const error = new Error();
      error.status = StatusCodes.FORBIDDEN;
      error.message = "Token is not valid";
      throw error;
    }
    req.user = user;
    next();
  });
};
