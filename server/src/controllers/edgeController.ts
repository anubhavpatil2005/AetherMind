import { Request, Response } from "express";
import { dbPromise } from "../database/db";

export async function createEdge(req: Request, res: Response) {
    try {

        const {
            mindmap_id,
            source_node_id,
            target_node_id,
            label
        } = req.body;

        if (
            !mindmap_id ||
            !source_node_id ||
            !target_node_id
        ) {
            return res.status(400).json({
                message: "Missing required fields."
            });
        }

        const db = await dbPromise;

        const result = await db.run(
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
                mindmap_id,
                source_node_id,
                target_node_id,
                label || ""
            ]
        );

        const edge = await db.get(
            `
            SELECT *
            FROM edges
            WHERE id=?
            `,
            [result.lastID]
        );

        return res.status(201).json(edge);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message:
                error instanceof Error
                    ? error.message
                    : "Internal Server Error"
        });

    }
}

export async function getEdges(
    req: Request,
    res: Response
) {

    try {

        const db = await dbPromise;

        const edges = await db.all(
            `
            SELECT *
            FROM edges
            WHERE mindmap_id=?
            `,
            [req.params.mindmapId]
        );

        return res.json(edges);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message:
                error instanceof Error
                    ? error.message
                    : "Internal Server Error"
        });

    }

}

export async function deleteEdge(
    req: Request,
    res: Response
) {

    try {

        const db = await dbPromise;

        await db.run(
            `
            DELETE FROM edges
            WHERE id=?
            `,
            [req.params.id]
        );

        return res.json({
            message: "Edge deleted successfully."
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message:
                error instanceof Error
                    ? error.message
                    : "Internal Server Error"
        });

    }

}