import api from "./axios";

export const createEdge = async (data: any) => {
    const res = await api.post("/edges", data);
    return res.data;
};

export const getEdges = async (
    mindmapId: number
) => {

    const res = await api.get(
        `/edges/${mindmapId}`
    );

    return res.data;
};

export const deleteEdge = async (
    id: number
) => {

    const res = await api.delete(
        `/edges/${id}`
    );

    return res.data;
};