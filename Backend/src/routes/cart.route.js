import { Router } from "express";
import authMiddleware from "../middleware/authCheck.middleware.js";
import { adminCheck } from "../middleware/adminCheck.middleware.js";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
} from "../controller/cart.controller.js";

const router = Router();

router.get("/", authMiddleware, getCart);
router.post("/add", authMiddleware, addToCart);
router.put("/update", authMiddleware, updateCartItem);
router.delete("/remove/:cartId", authMiddleware, removeCartItem);

export default router;
