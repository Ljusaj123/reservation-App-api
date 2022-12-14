import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
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
  const { min, max, ...other } = req.query;
  try {
    const getHotels = await Hotel.find({
      ...other,
      cheapestPrice: { $gt: min || 1, $lt: max || 999 },
    }).limit(req.query.limit);
    res.status(StatusCodes.OK).json(getHotels);
  } catch (error) {
    next(error);
  }
};
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");

  try {
    const count = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city });
      })
    );

    const citiesCounted = cities.map((city, index) => {
      return {
        name: city,
        count: count[index],
      };
    });

    // const count = cities.map((city) => {
    //   const count = Promise.resolve(Hotel.countDocuments({ city }));
    //   console.log(count);
    //   return {
    //     city,
    //     count,
    //   };
    // });

    res.status(StatusCodes.OK).json(citiesCounted);
  } catch (error) {
    next(error);
  }
};
export const countByType = async (req, res, next) => {
  const types = ["hotel", "hostel", "resort", "villa", "apartment"];
  try {
    const count = await Promise.all(
      types.map((prop) => {
        return Hotel.countDocuments({ type: prop });
      })
    );

    const propCounted = types.map((prop, index) => {
      return {
        name: prop,
        count: count[index],
      };
    });

    res.status(StatusCodes.OK).json(propCounted);
  } catch (error) {
    next(error);
  }
};

export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};
