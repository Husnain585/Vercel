import { Router } from "express";

import authMiddleware from "../middleware/authCheck.middleware.js";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from "../controller/wishlist.controller.js";

const router = Router();

router.get("/", authMiddleware, getWishlist);
router.post("/", authMiddleware, addToWishlist);
router.delete("/:wishlistId", authMiddleware, removeFromWishlist);

export default router;
