import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/users.js";
import { VerifyToken, VerifyUser } from "../middlewares/VerifyToken.js";

const router = express.Router();

router.get("/checkauthentication", VerifyToken, (req, res, next) => {
  res.send("Hello user, you are logged in");
});
router.get("/checkuser/:id", VerifyUser, (req, res, next) => {
  res.send("Hello user, you are logged in and can delete your account");
});

router.route("/").get(getAllUsers);
router.route("/:id").patch(updateUser).delete(deleteUser).get(getUser);

export default router;
