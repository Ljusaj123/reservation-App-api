import express from "express";
import {
  createRoom,
  deleteRoom,
  getAllRooms,
  getRoom,
  updateRoom,
} from "../controllers/.rooms.js";

const router = express.Router();

router.route("/").post(createRoom).get(getAllRooms);
router.route("/:id").put(updateRoom).delete(deleteRoom).get(getRoom);

export default router;
