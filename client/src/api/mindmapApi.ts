import api from "./axios";

export const getMindMaps = async () => {
    const res = await api.get("/mindmaps");
    return res.data;
};

export const getMindMap = async (id: number) => {
    const res = await api.get(`/mindmaps/${id}`);
    return res.data;
};

export const getGraph = async (id: number) => {
    const res = await api.get(`/mindmaps/${id}/graph`);
    return res.data;
};

export const createMindMap = async (data: {
    title: string;
    description: string;
}) => {
    const res = await api.post("/mindmaps", data);
    return res.data;
};

export const updateMindMap = async (
    id: number,
    data: any
) => {
    const res = await api.put(`/mindmaps/${id}`, data);
    return res.data;
};

export const deleteMindMap = async (id: number) => {
    const res = await api.delete(`/mindmaps/${id}`);
    return res.data;
};