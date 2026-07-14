import { Router } from "express";
import { login, register, profile } from "../controllers/authController";
import { authenticate } from "../middleware/auth";

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.get("/profile", authenticate, profile);

export default router;