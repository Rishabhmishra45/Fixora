import express from "express";
import protect from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/roleMiddleware.js";
import {
  createCategory,
  getAllCategories,
  updateCategory
} from "../controllers/categoryController.js";

const router = express.Router();

router.get("/", getAllCategories);

router.use(protect, authorizeRoles("admin"));
router.post("/", createCategory);
router.put("/:id", updateCategory);

export default router;
