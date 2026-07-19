import { Response } from "express";
import { dbPromise } from "../database/db";
import { AuthRequest } from "../middleware/auth";

/*
|--------------------------------------------------------------------------
| Create Node
|--------------------------------------------------------------------------
*/
export async function createNode(
    req: AuthRequest,
    res: Response
) {
    try {

        console.log("BODY:", req.body);
        console.log("USER:", req.user);

        const db = await dbPromise;

        const result = await db.run(
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
                req.body.mindmap_id,
                req.body.title,
                req.body.description || "",
                req.body.type || "topic",
                req.body.x || 0,
                req.body.y || 0,
                req.body.color || "#3B82F6"
            ]
        );

        const node = await db.get(
            "SELECT * FROM nodes WHERE id=?",
            [result.lastID]
        );

        return res.status(201).json(node);

    } catch (err) {

        console.error(err);

        return res.status(500).json({
            message: err instanceof Error ? err.message : String(err)
        });

    }
}
/*
|--------------------------------------------------------------------------
| Get Nodes
|--------------------------------------------------------------------------
*/

export async function getNodes(
    req: AuthRequest,
    res: Response
) {

    try {

        const db = await dbPromise;

        const nodes = await db.all(
            `
            SELECT *
            FROM nodes
            WHERE mindmap_id=?
            ORDER BY id
            `,
            [req.params.mindmapId]
        );

        return res.json(nodes);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: error instanceof Error
                ? error.message
                : "Internal Server Error"
        });

    }

}

/*
|--------------------------------------------------------------------------
| Update Node
|--------------------------------------------------------------------------
*/

export async function updateNode(
    req: AuthRequest,
    res: Response
) {

    try {

        const {
            title,
            description,
            type,
            x,
            y,
            color
        } = req.body;

        const db = await dbPromise;

        await db.run(
            `
            UPDATE nodes
            SET
                title=?,
                description=?,
                type=?,
                x=?,
                y=?,
                color=?
            WHERE id=?
            `,
            [
                title,
                description,
                type,
                x,
                y,
                color,
                req.params.id
            ]
        );

        const node = await db.get(
            "SELECT * FROM nodes WHERE id=?",
            [req.params.id]
        );

        return res.json(node);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: error instanceof Error
                ? error.message
                : "Internal Server Error"
        });

    }

}



export async function createChildNode(
    req: AuthRequest,
    res: Response
) {
    try {

        const {

            parentNodeId,

            title

        } = req.body;

        const db = await dbPromise;

        const parent = await db.get(
            `
            SELECT *
            FROM nodes
            WHERE id=?
            `,
            [parentNodeId]
        );

        if (!parent) {

            return res.status(404).json({

                message: "Parent node not found"

            });

        }

        const x = parent.x + 220;
        const y = parent.y + 120;

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

                title || "New Node",

                "",

                "concept",

                x,

                y,

                "#10B981"

            ]
        );

        const nodeId = nodeResult.lastID;

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

                nodeId,

                ""

            ]
        );

        const node = await db.get(
            `
            SELECT *
            FROM nodes
            WHERE id=?
            `,
            [nodeId]
        );

        const edge = await db.get(
            `
            SELECT *
            FROM edges
            WHERE id=?
            `,
            [edgeResult.lastID]
        );

        return res.status(201).json({

            node,

            edge

        });

    }

    catch (err) {

        console.error(err);

        return res.status(500).json({

            message: "Internal Server Error"

        });

    }

}



export async function deleteNode(
    req: AuthRequest,
    res: Response
) {

    try {

        const db = await dbPromise;

        const node = await db.get(

            `
            SELECT *
            FROM nodes
            WHERE id=?
            `,

            [req.params.id]

        );

        if (!node) {

            return res.status(404).json({

                message: "Node not found"

            });

        }

        await db.run(

            `
            DELETE FROM edges
            WHERE source_node_id=?
               OR target_node_id=?
            `,

            [

                req.params.id,

                req.params.id

            ]

        );

        await db.run(

            `
            DELETE FROM nodes
            WHERE id=?
            `,

            [req.params.id]

        );

        return res.json({

            message: "Node deleted successfully"

        });

    }

    catch (err) {

        console.error(err);

        return res.status(500).json({

            message: "Internal Server Error"

        });

    }

}