import { Router } from "express";
import authMiddleware from "../middleware/authCheck.middleware.js";
import { adminCheck } from "../middleware/adminCheck.middleware.js"; 
import {
  createOrder,
  getUserOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  cancelOrder,
} from "../controller/order.controller.js";

const router = Router();

// ===== User Routes =====
router.post("/", authMiddleware, createOrder); // Create order from cart
router.get("/", authMiddleware, getUserOrders); // Get logged-in user's orders
router.get("/:orderId", authMiddleware, getOrderById); // Get single order
router.put("/:orderId/cancel", authMiddleware, cancelOrder); // Cancel order (only if pending)

// ===== Admin Routes =====
router.get("/admin/all", authMiddleware, adminCheck, getAllOrders); // Get all orders
router.put("/admin/:orderId/status", authMiddleware, adminCheck, updateOrderStatus); // Update order status

export default router;
