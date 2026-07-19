import { Router } from "express";

import { generate } from "../controllers/aiController";

import { authenticate } from "../middleware/auth";

const router = Router();

router.post(
    "/generate",
    authenticate,
    generate
);

export default router;