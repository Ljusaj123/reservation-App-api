import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/users.js";
import {
  VerifyAdmin,
  VerifyToken,
  VerifyUser,
} from "../middlewares/VerifyToken.js";

const router = express.Router();

router.get("/checkauthentication", VerifyToken, (req, res, next) => {
  res.send("Hello user, you are logged in");
});
router.get("/checkuser/:id", VerifyUser, (req, res, next) => {
  res.send("Hello user, you are logged in and can delete your account");
});
router.get("/checkadmin/:id", VerifyAdmin, (req, res, next) => {
  res.send("Hello admin, you are logged in and can delete all accounts");
});

router.route("/").get(getAllUsers);
router.route("/:id").patch(updateUser).delete(deleteUser).get(getUser);

export default router;
