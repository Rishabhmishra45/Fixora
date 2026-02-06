import express from "express";
import protect from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/roleMiddleware.js";
import {
  getAllProviders,
  approveProvider,
  blockProvider,
  getAllReviews,
  toggleReviewVisibility
} from "../controllers/adminController.js";

const router = express.Router();

router.use(protect, authorizeRoles("admin"));

router.get("/providers", getAllProviders);
router.put("/providers/:id/approve", approveProvider);
router.put("/providers/:id/block", blockProvider);

/* REVIEWS */
router.get("/reviews", getAllReviews);
router.put("/reviews/:id/visibility", toggleReviewVisibility);

export default router;
