import { Router } from "express";
import { authenticate } from "../middleware/auth";

import {
    createEdge,
    getEdges,
    deleteEdge
} from "../controllers/edgeController";

const router = Router();

router.use(authenticate);

/*
|--------------------------------------------------------------------------
| Edge Routes
|--------------------------------------------------------------------------
*/

router.post("/", createEdge);

router.get("/:mindmapId", getEdges);

router.delete("/:id", deleteEdge);

export default router;