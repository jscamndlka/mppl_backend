import express from "express";
import {
  getReports,
  getReportById,
  createReport,
  updateStatus,
} from "../controllers/Report.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/reports", verifyUser, getReports);
router.get("/report/:id", getReportById);
router.post("/report", verifyUser, createReport);
router.patch("/report/:id", updateStatus);

export default router;
