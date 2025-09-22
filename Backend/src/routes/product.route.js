import { Router } from "express";
import multer from "multer";

import authMiddleware from "../middleware/authCheck.middleware.js";
import { adminCheck } from "../middleware/adminCheck.middleware.js";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controller/product.controller.js";

const router = Router();

// Multer config
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ===== Public Routes =====
router.get("/", getAllProducts);
router.get("/:productId", getProductById);

// ===== Protected Routes (admin/vendor) =====
router.post(
  "/",
  authMiddleware,
  adminCheck,                 // ✅ restricts to admin/vendor
  upload.array("images", 5),  // must match frontend input name
  createProduct
);

router.put(
  "/:productId",
  authMiddleware,
  adminCheck,
  upload.array("images", 5),
  updateProduct
);

router.delete("/:productId", authMiddleware, adminCheck, deleteProduct);

export default router;
