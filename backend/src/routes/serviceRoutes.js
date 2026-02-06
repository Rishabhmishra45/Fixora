import express from "express";
import protect from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/roleMiddleware.js";
import {
  createService,
  getAllServices,
  getServiceByCategory,
  updateService
} from "../controllers/serviceController.js";

const router = express.Router();

router.get("/", getAllServices);
router.get("/category/:categoryId", getServiceByCategory);

router.use(protect, authorizeRoles("provider"));
router.post("/", createService);
router.put("/:id", updateService);

export default router;
