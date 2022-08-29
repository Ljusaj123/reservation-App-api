import express from "express";
import {
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

export default router;
