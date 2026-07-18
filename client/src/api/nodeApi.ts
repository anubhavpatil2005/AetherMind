import api from "./axios";

export const createNode = async (data: any) => {
    const res = await api.post("/nodes", data);
    return res.data;
};

export const getNodes = async (
    mindmapId: number
) => {

    const res = await api.get(
        `/nodes/${mindmapId}`
    );

    return res.data;
};

export const updateNode = async (
    id: number,
    data: any
) => {

    const res = await api.put(
        `/nodes/${id}`,
        data
    );

    return res.data;
};

export const deleteNode = async (
    id: number
) => {

    const res = await api.delete(
        `/nodes/${id}`
    );

    return res.data;
};