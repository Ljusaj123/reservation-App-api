import express from "express";
import {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getAllHotels,
  getHotel,
  updateHotel,
} from "../controllers/hotels.js";
import { VerifyAdmin, VerifyUser } from "../middlewares/Verify.js";

const router = express.Router();

router.route("/").post(VerifyUser, createHotel).get(VerifyAdmin, getAllHotels);
router
  .route("/:id")
  .patch(VerifyUser, updateHotel)
  .delete(VerifyUser, deleteHotel)
  .get(VerifyUser, getHotel);

router.route("/count/city").get(countByCity);
router.route("/count/type").get(countByType);
export default router;
