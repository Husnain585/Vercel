
import { Router } from "express";
import {
  sendVerificationEmail,
  verifyEmailCode,
  verifyEmailLink,
} from "../controller/emailCheck.controller.js";

const routes = Router();

// Send email (after register)
routes.post("/send-verification", sendVerificationEmail);

// Verify via OTP code
routes.post("/verify-email", verifyEmailCode);

// Verify via clickable link
routes.get("/verify-email/:token", verifyEmailLink);

export default routes;
