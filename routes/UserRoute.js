import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
} from "../controllers/User.js";
import { countTHL } from "../controllers/DashboardAdmin.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/users", verifyUser, adminOnly, getUsers);
router.get("/users/:id", verifyUser, adminOnly, getUserById);
router.post("/user", createUser);
router.patch("/users/:id", verifyUser, adminOnly, updateUser);
router.get("/user/thl/count", countTHL);

export default router;
