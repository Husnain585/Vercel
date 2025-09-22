import { Router } from "express";

import {
  getProfile,
  updateProfile,
  deleteProfile,
  changePassword,
} from "../controller/user.controller.js";
import authMiddleware from "../middleware/authCheck.middleware.js";
import validate from "../middleware/validate.middleware.js";
import {
  updateProfileSchema,
  changePasswordSchema,
} from "../validation/user.validator.js";

const routes = Router();

routes.get("/me", authMiddleware, getProfile);
routes.put("/update", authMiddleware, validate(updateProfileSchema), updateProfile);
routes.delete("/delete", authMiddleware, deleteProfile);
routes.put("/change-password", authMiddleware, validate(changePasswordSchema), changePassword);

export default routes;
