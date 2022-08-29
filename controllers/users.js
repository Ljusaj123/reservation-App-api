import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";

export const updateUser = async (req, res, next) => {
  const { id: userID } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    if (!updatedUser) {
      const error = new Error();
      error.status = StatusCodes.BAD_REQUEST;
      error.message = `The user with id ${userID} does not exist`;
      throw error;
    }
    res.status(StatusCodes.OK).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  const { id: userID } = req.params;

  try {
    const user = await User.findByIdAndDelete(userID);
    if (!user) {
      const error = new Error();
      error.status = StatusCodes.BAD_REQUEST;
      error.message = `The user with id ${userID} does not exist`;
      throw error;
    }
    res.status(StatusCodes.OK).json("User has been deleted");
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  const { id: userID } = req.params;
  try {
    const user = await User.findById(userID);
    if (!user) {
      const error = new Error();
      error.status = StatusCodes.BAD_REQUEST;
      error.message = `The user with id ${userID} does not exist`;
      throw error;
    }
    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const getUsers = await User.find({});
    res.status(StatusCodes.OK).json(getUsers);
  } catch (error) {
    next(error);
  }
};
