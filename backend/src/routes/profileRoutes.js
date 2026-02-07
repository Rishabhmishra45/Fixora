import express from "express";
import {
  getMyProfile,
  updateProfile,
  changePassword
} from "../controllers/profileController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/me", authMiddleware, getMyProfile);
router.put("/update", authMiddleware, updateProfile);
router.put("/change-password", authMiddleware, changePassword);

export default router;
