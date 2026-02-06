import express from "express";
import protect from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/roleMiddleware.js";
import {
  getDashboardOverview,
  getRevenueStats,
  getBookingTrends,
  getProviderPerformance,
  getRatingHealth,
  getCancellationStats
} from "../controllers/analyticsController.js";

const router = express.Router();

router.use(protect, authorizeRoles("admin"));

router.get("/overview", getDashboardOverview);
router.get("/revenue", getRevenueStats);
router.get("/bookings-trends", getBookingTrends);
router.get("/providers-performance", getProviderPerformance);
router.get("/ratings-health", getRatingHealth);
router.get("/cancellations", getCancellationStats);

export default router;
