import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";

export const register = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = new User({ username, email, password: hash });

    await newUser.save();
    res.status(StatusCodes.OK).json(`User ${username} has been created`);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      const error = new Error();
      error.status = StatusCodes.NOT_FOUND;
      error.message = `User not found`;
      throw error;
    }

    const compare = bcrypt.compareSync(password, user.password);

    if (!compare) {
      const error = new Error();
      error.status = StatusCodes.UNAUTHORIZED;
      error.message = `The username or password is not valid`;
      throw error;
    }

    res.status(StatusCodes.OK).json(`Hello user ${username}`);
  } catch (err) {
    next(err);
  }
};
