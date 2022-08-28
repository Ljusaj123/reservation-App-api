import Hotel from "../models/Hotel.js";

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    next(error);
  }
};

export const updateHotel = async (req, res, next) => {
  const { id: hotelID } = req.params;
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    if (!updatedHotel) {
      const error = new Error();
      error.status = 400;
      error.message = `The hotel with id ${hotelID} does not exist`;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

export const deleteHotel = async (req, res, next) => {
  const { id: hotelID } = req.params;

  try {
    const hotel = await Hotel.findByIdAndDelete(req.params.id);
    if (!hotel) {
      const error = new Error();
      error.status = 400;
      error.message = `The hotel with id ${hotelID} does not exist`;
      throw error;
    }
    res.status(200).json("Hotel has been deleted");
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
      error.status = 400;
      error.message = `The hotel with id ${hotelID} does not exist`;
      throw error;
    }
    res.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
};

export const getAllHotels = async (req, res, next) => {
  try {
    const getHotels = await Hotel.find({});
    res.status(200).json(getHotels);
  } catch (error) {
    next(error);
  }
};
