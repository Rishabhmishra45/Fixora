import express from "express";
import {
  getMyNotifications,
  markNotificationsRead
} from "../controllers/notificationController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/my", authMiddleware, getMyNotifications);
router.post(
  "/mark-read",
  authMiddleware,
  markNotificationsRead
);

export default router;
