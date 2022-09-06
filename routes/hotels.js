import express from "express";
import {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getAllHotels,
  getHotel,
  updateHotel,
  getHotelRooms,
} from "../controllers/hotels.js";
import { VerifyAdmin, VerifyUser } from "../middlewares/Verify.js";

const router = express.Router();

router.route("/").post(VerifyUser, createHotel).get(VerifyUser, getAllHotels);
router
  .route("/:id")
  .patch(VerifyUser, updateHotel)
  .delete(VerifyUser, deleteHotel)
  .get(VerifyUser, getHotel);

router.route("/count/city").get(countByCity);
router.route("/count/type").get(countByType);
router.route("/room/:id").get(getHotelRooms);
export default router;
