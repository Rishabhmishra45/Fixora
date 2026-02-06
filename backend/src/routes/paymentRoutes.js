import express from "express";
import protect from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/roleMiddleware.js";
import {
  createPaymentOrder,
  verifyPayment,
  selectOfflinePayment,
  providerVerifyOfflinePayment
} from "../controllers/paymentController.js";

const router = express.Router();

/* ONLINE */
router.post(
  "/online/create-order",
  protect,
  authorizeRoles("customer"),
  createPaymentOrder
);

router.post(
  "/online/verify",
  protect,
  authorizeRoles("customer"),
  verifyPayment
);

/* OFFLINE */
router.post(
  "/offline/select",
  protect,
  authorizeRoles("customer"),
  selectOfflinePayment
);

router.put(
  "/offline/:id/verify",
  protect,
  authorizeRoles("provider"),
  providerVerifyOfflinePayment
);

export default router;
