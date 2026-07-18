import { updateNode } from "../api/nodeApi";

export async function saveNode(node:any){

    await updateNode(

        node.id,

        node

    );

}