import { Response } from "express";

import { AuthRequest } from "../middleware/auth";

import {

    generateMindMap,

    expandNodeAI

} from "../services/aiService";

import { generateGraph } from "../services/graphGenerator";

import { dbPromise } from "../database/db";

/*
|--------------------------------------------------------------------------
| Generate Complete MindMap
|--------------------------------------------------------------------------
*/

export async function generate(
    req: AuthRequest,
    res: Response
) {

    try {

        const { topic } = req.body;

        if (!topic) {

            return res.status(400).json({

                message: "Topic is required"

            });

        }

        const ai = await generateMindMap(topic);

        const graph = await generateGraph(

            req.user.id,

            topic,

            ai

        );

        return res.json(graph);

    }

    catch (err: any) {

        console.error(err);

        return res.status(500).json({

            message: err.message

        });

    }

}

/*
|--------------------------------------------------------------------------
| Expand Existing Node using AI
|--------------------------------------------------------------------------
*/

export async function expandNode(
    req: AuthRequest,
    res: Response
) {

    try {

        const { nodeId } = req.body;

        if (!nodeId) {

            return res.status(400).json({

                message: "nodeId is required"

            });

        }

        const db = await dbPromise;

        const parent = await db.get(

            `
            SELECT *
            FROM nodes
            WHERE id=?
            `,

            [nodeId]

        );

        if (!parent) {

            return res.status(404).json({

                message: "Node not found"

            });

        }

        const children = await expandNodeAI(

            parent.title

        );

        const nodes = [];

        const edges = [];

        let offsetY = 0;

        for (const child of children) {

            const nodeResult = await db.run(

                `
                INSERT INTO nodes(

                    mindmap_id,

                    title,

                    description,

                    type,

                    x,

                    y,

                    color

                )

                VALUES(?,?,?,?,?,?,?)

                `,

                [

                    parent.mindmap_id,

                    child,

                    "",

                    "concept",

                    parent.x + 240,

                    parent.y + offsetY,

                    "#10B981"

                ]

            );

            const node = await db.get(

                "SELECT * FROM nodes WHERE id=?",

                [nodeResult.lastID]

            );

            nodes.push(node);

            const edgeResult = await db.run(

                `
                INSERT INTO edges(

                    mindmap_id,

                    source_node_id,

                    target_node_id,

                    label

                )

                VALUES(?,?,?,?)

                `,

                [

                    parent.mindmap_id,

                    parent.id,

                    node.id,

                    ""

                ]

            );

            const edge = await db.get(

                "SELECT * FROM edges WHERE id=?",

                [edgeResult.lastID]

            );

            edges.push(edge);

            offsetY += 120;

        }

        return res.json({

            nodes,

            edges

        });

    }

    catch (err: any) {

        console.error(err);

        return res.status(500).json({

            message: err.message

        });

    }

}