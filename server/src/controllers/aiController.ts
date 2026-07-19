import { Response } from "express";

import { AuthRequest } from "../middleware/auth";

import { generateMindMap } from "../services/aiService";

import { generateGraph } from "../services/graphGenerator";

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

    } catch (err: any) {

        console.error(err);

        return res.status(500).json({

            message:

                err.message

        });

    }

}