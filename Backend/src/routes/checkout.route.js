import { Router } from "express";
import checkoutController from "../controller/checkout.controller.js";
import authCheckMiddleware from "../middleware/authCheck.middleware.js";

const router = Router();

router.post("/payment-intent", authCheckMiddleware, checkoutController.createPaymentIntent);
router.post("/confirm-order", authCheckMiddleware, checkoutController.confirmOrder);

export default router;
