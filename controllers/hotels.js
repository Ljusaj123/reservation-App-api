import Hotel from "../models/Hotel.js";
import { StatusCodes } from "http-status-codes";

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(StatusCodes.OK).json(savedHotel);
  } catch (error) {
    next(error);
  }
};

export const updateHotel = async (req, res, next) => {
  const { id: hotelID } = req.params;
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      hotelID,
      {
        $set: req.body,
      },
      { new: true }
    );
    if (!updatedHotel) {
      const error = new Error();
      error.status = StatusCodes.BAD_REQUEST;
      error.message = `The hotel with id ${hotelID} does not exist`;
      throw error;
    }
    res.status(StatusCodes.OK).json(updatedHotel);
  } catch (error) {
    next(error);
  }
};

export const deleteHotel = async (req, res, next) => {
  const { id: hotelID } = req.params;

  try {
    const hotel = await Hotel.findByIdAndDelete(hotelID);
    if (!hotel) {
      const error = new Error();
      error.status = StatusCodes.BAD_REQUEST;
      error.message = `The hotel with id ${hotelID} does not exist`;
      throw error;
    }
    res.status(StatusCodes.OK).json("Hotel has been deleted");
  } catch (error) {
    next(error);
  }
};

export const getHotel = async (req, res, next) => {
  const { id: hotelID } = req.params;
  try {
    const hotel = await Hotel.findById(hotelID);
    if (!hotel) {
      const error = new Error();
      error.status = StatusCodes.BAD_REQUEST;
      error.message = `The hotel with id ${hotelID} does not exist`;
      throw error;
    }
    res.status(StatusCodes.OK).json(hotel);
  } catch (error) {
    next(error);
  }
};

export const getAllHotels = async (req, res, next) => {
  try {
    const getHotels = await Hotel.find({});
    res.status(StatusCodes.OK).json(getHotels);
  } catch (error) {
    next(error);
  }
};
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");

  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city });
      })
    );
    res.status(StatusCodes.OK).json(list);
  } catch (error) {
    next(error);
  }
};
export const countByType = async (req, res, next) => {
  const types = req.query.types.split(",");
  try {
    const list = await Promise.all(
      types.map((prop) => {
        return Hotel.countDocuments({ prop });
      })
    );
    res.status(StatusCodes.OK).json(list);
  } catch (error) {
    next(error);
  }
};
