import api from "../api/axios";

export const generateMindMap = async (topic: string) => {
    const res = await api.post("/ai/generate", { topic });
    return res.data;
};
