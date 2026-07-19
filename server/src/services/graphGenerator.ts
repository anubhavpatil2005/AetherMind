import { dbPromise } from "../database/db";

interface AIResponse {
    root: string;
    children: string[];
}

export async function generateGraph(
    userId: number,
    topic: string,
    aiData: AIResponse
) {

    const db = await dbPromise;

    // Create MindMap
    const mindmapResult = await db.run(
        `
        INSERT INTO mindmaps(
            user_id,
            title,
            description
        )
        VALUES(?,?,?)
        `,
        [
            userId,
            topic,
            `AI Generated Mind Map for ${topic}`
        ]
    );

    const mindmapId = mindmapResult.lastID;

    // Create Root Node
    const rootResult = await db.run(
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
            mindmapId,
            aiData.root,
            "Root Topic",
            "root",
            500,
            200,
            "#3B82F6"
        ]
    );

    const rootNodeId = rootResult.lastID;

    // Create Child Nodes
    for (let i = 0; i < aiData.children.length; i++) {

        const angle =
            (2 * Math.PI * i) /
            aiData.children.length;

        const x =
            500 +
            Math.cos(angle) * 250;

        const y =
            200 +
            Math.sin(angle) * 250;

        const child = await db.run(
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
                mindmapId,
                aiData.children[i],
                "",
                "concept",
                x,
                y,
                "#10B981"
            ]
        );

        await db.run(
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
                mindmapId,
                rootNodeId,
                child.lastID,
                ""
            ]
        );

    }

    const nodes = await db.all(
        `
        SELECT *
        FROM nodes
        WHERE mindmap_id=?
        `,
        [mindmapId]
    );

    const edges = await db.all(
        `
        SELECT *
        FROM edges
        WHERE mindmap_id=?
        `,
        [mindmapId]
    );

    return {

        mindmapId,

        nodes,

        edges

    };

}