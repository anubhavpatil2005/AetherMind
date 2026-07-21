import { Router } from "express";

import {

    generate,

    expandNode

} from "../controllers/aiController";

import { authenticate } from "../middleware/auth";

const router = Router();

/*
|--------------------------------------------------------------------------
| Protect all AI Routes
|--------------------------------------------------------------------------
*/

router.use(authenticate);

/*
|--------------------------------------------------------------------------
| Generate Complete MindMap
|--------------------------------------------------------------------------
*/

router.post(

    "/generate",

    generate

);

/*
|--------------------------------------------------------------------------
| Expand Existing Node using AI
|--------------------------------------------------------------------------
*/

router.post(

    "/expand",

    expandNode

);

export default router;