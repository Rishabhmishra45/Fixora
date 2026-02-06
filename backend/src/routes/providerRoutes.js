import express from "express";
import protect from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/roleMiddleware.js";
import {
  createOrUpdateProfile,
  getMyProfile
} from "../controllers/providerController.js";

const router = express.Router();

router.use(protect, authorizeRoles("provider"));

router.post("/profile", createOrUpdateProfile);
router.get("/profile", getMyProfile);

export default router;
