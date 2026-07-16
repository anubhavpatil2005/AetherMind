import { Router } from "express";

import { authenticate } from "../middleware/auth";

import {
    createMindMap,
    getMindMaps,
    getMindMap,
    updateMindMap,
    deleteMindMap
} from "../controllers/mindmapController";

const router = Router();

/*
|--------------------------------------------------------------------------
| Protected Routes
|--------------------------------------------------------------------------
*/

router.use(authenticate);

/*
|--------------------------------------------------------------------------
| CRUD
|--------------------------------------------------------------------------
*/

router.get("/", getMindMaps);

router.get("/:id", getMindMap);

router.post("/", createMindMap);

router.put("/:id", updateMindMap);

router.delete("/:id", deleteMindMap);

export default router;