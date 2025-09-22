import { Router } from "express";

import authMiddleware from "../middleware/authCheck.middleware.js";
import {
  createProductImage,
  getProductImages,
  deleteProductImage,
} from "../controller/productImage.controller.js";
import { adminCheck } from "../middleware/adminCheck.middleware.js";

const router = Router();

// ===== Public Routes =====
router.get("/:productId", getProductImages);

// ===== Protected Routes (admin only) =====
router.post("/", authMiddleware, adminCheck, createProductImage);
router.delete("/:imageId", authMiddleware, adminCheck, deleteProductImage);

export default router;
