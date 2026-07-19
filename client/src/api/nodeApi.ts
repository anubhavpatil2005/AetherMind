import api from "./axios";

/* -------------------------------- */
/* Create Node */
/* -------------------------------- */

export async function createNode(data: any) {

    const response = await api.post(

        "/nodes",

        data

    );

    return response.data;

}

/* -------------------------------- */
/* Create Child Node */
/* -------------------------------- */

export async function createChildNode(

    parentNodeId: number,

    title = "New Node"

) {

    const response = await api.post(

        "/nodes/child",

        {

            parentNodeId,

            title

        }

    );

    return response.data;

}

/* -------------------------------- */
/* Update Node */
/* -------------------------------- */

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

/* -------------------------------- */
/* Delete Node */
/* -------------------------------- */

export async function deleteNode(

    id: number

) {

    const response = await api.delete(

        `/nodes/${id}`

    );

    return response.data;

}

/* -------------------------------- */
/* Duplicate Node */
/* -------------------------------- */

export async function duplicateNode(

    id: number

) {

    const response = await api.post(

        `/nodes/${id}/duplicate`

    );

    return response.data;

}

/* -------------------------------- */
/* Change Node Color */
/* -------------------------------- */

export async function updateNodeColor(

    id: number,

    color: string

) {

    const response = await api.put(

        `/nodes/${id}`,

        {

            color

        }

    );

    return response.data;

}

/* -------------------------------- */
/* Expand Node using AI */
/* -------------------------------- */

export async function expandNodeAI(

    nodeId: number

) {

    const response = await api.post(

        `/ai/expand`,

        {

            nodeId

        }

    );

    return response.data;

}