import express from "express";
import {
  createRoom,
  deleteRoom,
  getAllRooms,
  getRoom,
  updateRoom,
} from "../controllers/rooms.js";
import { VerifyUser, VerifyAdmin } from "../middlewares/Verify.js";

const router = express.Router();

router.route("/").post(VerifyAdmin, createRoom).get(VerifyAdmin, getAllRooms);
router
  .route("/:id")
  .put(VerifyUser, updateRoom)
  .delete(VerifyUser, deleteRoom)
  .get(VerifyUser, getRoom);

export default router;
