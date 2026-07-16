import { Router } from "express";

import {
    register,
    login,
    profile
} from "../controllers/authController";

import { authenticate } from "../middleware/auth";

const router = Router();

/**
 * Public Routes
 */
router.post("/register", register);

router.post("/login", login);

/**
 * Protected Routes
 */
router.get("/profile", authenticate, profile);

export default router;