import express from "express";
import {
  register,
  login,
  googleLoginCustomer
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/google/customer", googleLoginCustomer);

export default router;
