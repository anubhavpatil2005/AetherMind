import { Router } from "express";
import { authenticate } from "../middleware/auth";

import {
    createNode,
    getNodes,
    updateNode,
    deleteNode
} from "../controllers/nodeController";

const router = Router();

router.use(authenticate);

router.post("/", createNode);
router.get("/:mindmapId", getNodes);
router.put("/:id", updateNode);
router.delete("/:id", deleteNode);

export default router;