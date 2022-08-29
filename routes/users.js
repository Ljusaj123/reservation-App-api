import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/users.js";

const router = express.Router();

router.route("/").get(getAllUsers);
router.route("/:id").put(updateUser).delete(deleteUser).get(getUser);

export default router;
