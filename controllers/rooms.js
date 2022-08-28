import Room from "../models/Room.js";

export const createRoom = async (req, res, next) => {
  const newRoom = new Room(req.body);
  try {
    const savedRoom = await newRoom.save();
    res.status(200).json(savedRoom);
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
    if (!updatedRoom)
      throw new Error(`The hotel with id ${roomID} does not exist`);
    res.status(200).json(updatedRoom);
  } catch (error) {
    next(error);
  }
};

export const deleteRoom = async (req, res, next) => {
  const { id: roomID } = req.params;
  try {
    const room = await Room.findByIdAndDelete(roomID);
    if (!room) throw new Error(`The hotel with id ${roomID} does not exist`);
    res.status(200).json("Hotel has been deleted");
  } catch (error) {
    next(error);
  }
};

export const getRoom = async (req, res, next) => {
  const { id: roomID } = req.params;
  try {
    const room = await Room.findById(req.params.id);
    if (!room) throw new Error(`The hotel with id ${roomID} does not exist`);
    res.status(200).json(room);
  } catch (error) {
    next(error);
  }
};

export const getAllRooms = async (req, res, next) => {
  try {
    const getRooms = await Room.find({});
    res.status(200).json(getRooms);
  } catch (error) {
    next(error);
  }
};
