import express from "express";
import protect from "../middlewares/authMiddleware.js";
import { getCustomerDashboardStats } from "../controllers/dashboardController.js";

const router = express.Router();

router.use(protect);

router.get("/customer-stats", getCustomerDashboardStats);

export default router;
