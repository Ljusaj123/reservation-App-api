import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/users.js";
import { VerifyAdmin, VerifyToken, VerifyUser } from "../middlewares/Verify.js";

const router = express.Router();

router.route("/").get(VerifyAdmin, getAllUsers);
router
  .route("/:id")
  .patch(VerifyUser, updateUser)
  .delete(VerifyUser, deleteUser)
  .get(VerifyUser, getUser);

export default router;
