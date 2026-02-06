import express from "express";
import protect from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/roleMiddleware.js";
import {
  submitReview,
  getMyReviews,
  getProviderReviews
} from "../controllers/reviewController.js";

const router = express.Router();

/* CUSTOMER */
router.post(
  "/",
  protect,
  authorizeRoles("customer"),
  submitReview
);

router.get(
  "/my",
  protect,
  authorizeRoles("customer"),
  getMyReviews
);

/* PUBLIC */
router.get("/provider/:providerId", getProviderReviews);

export default router;
