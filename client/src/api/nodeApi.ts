import api from "./axios";

export async function updateNode(
    id: number,
    data: any
) {

    const response = await api.put(

        `/nodes/${id}`,

        data

    );

    return response.data;

}

export async function createNode(
    data: any
) {

    const response = await api.post(

        "/nodes",

        data

    );

    return response.data;

}

export async function deleteNode(
    id: number
) {

    await api.delete(

        `/nodes/${id}`

    );

}