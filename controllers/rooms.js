import Room from "../models/Room.js";
import { StatusCodes } from "http-status-codes";

export const createRoom = async (req, res, next) => {
  const newRoom = new Room(req.body);
  try {
    const savedRoom = await newRoom.save();
    res.status(StatusCodes.OK).json(savedRoom);
  } catch (error) {
    next(error);
  }
};

export const updateRoom = async (req, res, next) => {
  const { id: roomID } = req.params;
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      roomID,
      {
        $set: req.body,
      },
      { new: true }
    );
    if (!updatedRoom) {
      const error = new Error();
      error.status = StatusCodes.BAD_REQUEST;
      error.message = `The room with id ${roomID} does not exist`;
      throw error;
    }
    res.status(StatusCodes.OK).json(updatedRoom);
  } catch (error) {
    next(error);
  }
};

export const deleteRoom = async (req, res, next) => {
  const { id: roomID } = req.params;
  try {
    const room = await Room.findByIdAndDelete(roomID);
    if (!room) {
      const error = new Error();
      error.status = StatusCodes.BAD_REQUEST;
      error.message = `The room with id ${roomID} does not exist`;
      throw error;
    }
    res.status(StatusCodes.OK).json("Room has been deleted");
  } catch (error) {
    next(error);
  }
};

export const getRoom = async (req, res, next) => {
  const { id: roomID } = req.params;
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      const error = new Error();
      error.status = StatusCodes.BAD_REQUEST;
      error.message = `The room with id ${roomID} does not exist`;
      throw error;
    }

    res.status(StatusCodes.OK).json(room);
  } catch (error) {
    next(error);
  }
};

export const getAllRooms = async (req, res, next) => {
  try {
    const getRooms = await Room.find({});
    res.status(StatusCodes.OK).json(getRooms);
  } catch (error) {
    next(error);
  }
};
