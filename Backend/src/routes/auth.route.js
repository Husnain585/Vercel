import { Router } from "express";
import {
  Login,
  Logout,
  Register,
  LoginWithGoogle,
  googleCallback,
  LoginWithGithub,
  githubCallback,
} from "../controller/auth.controller.js";

import authMiddleware from "../middleware/authCheck.middleware.js";
import { loginSchema, registerSchema } from "../validation/user.validator.js";
import validate from "../middleware/validate.middleware.js";

const routes = Router();

routes.post("/login", Login);
routes.post("/logout", Logout);
routes.post("/register", validate(registerSchema), Register);

// Google OAuth
routes.get("/google", LoginWithGoogle);
routes.get("/google/callback", googleCallback);

// GitHub OAuth
routes.get("/github", LoginWithGithub);
routes.get("/github/callback", githubCallback);

// Example of a protected route
routes.get("/me", authMiddleware, (req, res) => {
  res.json({ message: "Protected route accessed!", user: req.user });
});

export default routes;
