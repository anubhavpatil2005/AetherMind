import api from "./axios";

export async function getGraph(mindmapId: number) {

    const response = await api.get(
        `/mindmaps/${mindmapId}/graph`
    );

    return response.data;

}