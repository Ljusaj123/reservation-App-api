import express from "express";
import {
  createRoom,
  deleteRoom,
  getAllRooms,
  getRoom,
  updateRoom,
  updateRoomAvailability,
} from "../controllers/rooms.js";
import { VerifyUser, VerifyAdmin } from "../middlewares/Verify.js";

const router = express.Router();

router.route("/:hotelid").post(VerifyAdmin, createRoom);
router.route("/").get(VerifyAdmin, getAllRooms);
router.route("/:id/:hotelid").delete(VerifyUser, deleteRoom);
router.route("/:id").patch(VerifyUser, updateRoom).get(VerifyUser, getRoom);
router.route("/availability/:id").patch(updateRoomAvailability);
export default router;
