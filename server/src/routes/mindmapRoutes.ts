import { Router } from "express";

import { authenticate } from "../middleware/auth";

import {
    createMindMap,
    getMindMaps,
    getMindMap,
    updateMindMap,
    deleteMindMap,
    getGraph
} from "../controllers/mindmapController";

const router = Router();

router.use(authenticate);

router.get("/", getMindMaps);

router.get("/:id/graph", getGraph);

router.get("/:id", getMindMap);

router.post("/", createMindMap);

router.put("/:id", updateMindMap);

router.delete("/:id", deleteMindMap);

export default router;