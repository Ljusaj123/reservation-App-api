import express from "express";
import {
  createHotel,
  deleteHotel,
  getAllHotels,
  getHotel,
  updateHotel,
} from "../controllers/.hotels.js";

const router = express.Router();

router.route("/").post(createHotel).get(getAllHotels);
router.route("/:id").put(updateHotel).delete(deleteHotel).get(getHotel);

export default router;
