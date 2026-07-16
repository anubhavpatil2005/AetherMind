import { Response } from "express";
import { dbPromise } from "../database/db";
import { AuthRequest } from "../middleware/auth";

export async function createMindMap(
    req: AuthRequest,
    res: Response
) {
    try {

        const { title, description } = req.body;

        if (!title) {
            return res.status(400).json({
                message: "Title is required."
            });
        }

        const db = await dbPromise;

        const result = await db.run(
            `
            INSERT INTO mindmaps(
                user_id,
                title,
                description
            )
            VALUES(?,?,?)
            `,
            [
                req.user.id,
                title,
                description || ""
            ]
        );

        const mindmap = await db.get(
            `
            SELECT *
            FROM mindmaps
            WHERE id = ?
            `,
            [result.lastID]
        );

        return res.status(201).json({
            message: "MindMap created successfully.",
            mindmap
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

export async function getMindMaps(
    req: AuthRequest,
    res: Response
) {

    try {

        const db = await dbPromise;

        const maps = await db.all(
            `
            SELECT *
            FROM mindmaps
            WHERE user_id = ?
            ORDER BY updated_at DESC
            `,
            [req.user.id]
        );

        return res.json(maps);

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

export async function getMindMap(
    req: AuthRequest,
    res: Response
) {

    try {

        const db = await dbPromise;

        const map = await db.get(
            `
            SELECT *
            FROM mindmaps
            WHERE id = ?
            AND user_id = ?
            `,
            [
                req.params.id,
                req.user.id
            ]
        );

        if (!map) {

            return res.status(404).json({
                message: "MindMap not found."
            });

        }

        return res.json(map);

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

export async function updateMindMap(
    req: AuthRequest,
    res: Response
) {

    try {

        const { title, description } = req.body;

        const db = await dbPromise;

        await db.run(
            `
            UPDATE mindmaps
            SET
                title=?,
                description=?,
                updated_at=CURRENT_TIMESTAMP
            WHERE
                id=?
            AND
                user_id=?
            `,
            [
                title,
                description,
                req.params.id,
                req.user.id
            ]
        );

        const updated = await db.get(
            `
            SELECT *
            FROM mindmaps
            WHERE id=?
            `,
            [req.params.id]
        );

        return res.json({
            message: "MindMap updated successfully.",
            mindmap: updated
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

export async function deleteMindMap(
    req: AuthRequest,
    res: Response
) {

    try {

        const db = await dbPromise;

        await db.run(
            `
            DELETE
            FROM mindmaps
            WHERE
                id=?
            AND
                user_id=?
            `,
            [
                req.params.id,
                req.user.id
            ]
        );

        return res.json({
            message: "MindMap deleted successfully."
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