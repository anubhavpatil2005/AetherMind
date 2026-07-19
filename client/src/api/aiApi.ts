import api from "./axios";

export async function generateMindMap(topic: string) {

    const res = await api.post("/ai/generate", {
        topic
    });

    return res.data;
}