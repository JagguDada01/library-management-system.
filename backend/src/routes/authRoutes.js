import express from "express";
import { register, login, getCurrentUser, adminCheck } from "../controllers/authController.js";
import authenticateUser from "../middleware/authenticateUser.js";
import requireAdmin from "../middleware/requireAdmin.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authenticateUser, getCurrentUser);
router.get(
  "/admin-check",
  authenticateUser,
  requireAdmin,
  adminCheck
);

export default router;
