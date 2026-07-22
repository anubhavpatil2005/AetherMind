/*
|--------------------------------------------------------------------------
| Duplicate Node
|--------------------------------------------------------------------------
*/

export async function duplicateNode(
    req: AuthRequest,
    res: Response
) {

    try {

        const db = await dbPromise;

        const original = await db.get(

            `
            SELECT *
            FROM nodes
            WHERE id=?
            `,

            [req.params.id]

        );

        if (!original) {

            return res.status(404).json({

                message: "Node not found"

            });

        }

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

                original.mindmap_id,

                `${original.title} Copy`,

                original.description,

                original.type,

                original.x + 40,

                original.y + 40,

                original.color

            ]

        );

        const node = await db.get(

            `
            SELECT *
            FROM nodes
            WHERE id=?
            `,

            [result.lastID]

        );

        return res.status(201).json(node);

    }

    catch (err) {

        console.error(err);

        return res.status(500).json({

            message: "Internal Server Error"

        });

    }

}