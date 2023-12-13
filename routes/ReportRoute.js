import express from "express";
import {
  getReports,
  getReportById,
  createReport,
  updateStatus,
} from "../controllers/Report.js";
import {
  reportNotCompleted,
  reportAccept,
  reportReject,
} from "../controllers/DashboardAdmin.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/reports", verifyUser, getReports);
router.get("/report/:id", getReportById);
router.post("/report", verifyUser, createReport);
router.patch("/report/:id", updateStatus);
router.get("/report/not-completed/count", verifyUser, reportNotCompleted);
router.get("/report/accept/count", verifyUser, reportAccept);
router.get("/report/reject/count", verifyUser, reportReject);

export default router;
