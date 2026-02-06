import express from "express";
import protect from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/roleMiddleware.js";
import {
  createBooking,
  getMyBookings,
  getAvailableBookingsForProvider,
  acceptBooking,
  startJob,
  completeJob,
  cancelBooking
} from "../controllers/bookingController.js";

const router = express.Router();

/* CUSTOMER */
router.post("/", protect, authorizeRoles("customer"), createBooking);
router.get("/my", protect, authorizeRoles("customer"), getMyBookings);

/* PROVIDER */
router.get(
  "/available",
  protect,
  authorizeRoles("provider"),
  getAvailableBookingsForProvider
);

router.put(
  "/:id/accept",
  protect,
  authorizeRoles("provider"),
  acceptBooking
);

router.put(
  "/:id/start",
  protect,
  authorizeRoles("provider"),
  startJob
);

router.put(
  "/:id/complete",
  protect,
  authorizeRoles("provider"),
  completeJob
);

/* COMMON */
router.put(
  "/:id/cancel",
  protect,
  authorizeRoles("customer", "provider"),
  cancelBooking
);

export default router;
