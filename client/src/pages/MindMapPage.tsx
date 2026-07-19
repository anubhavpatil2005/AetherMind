import { useParams } from "react-router-dom";

import Canvas from "../canvas/Canvas";

export default function MindMapPage() {

    const { id } = useParams();

    if (!id) {

        return <h1>MindMap Not Found</h1>;

    }

    return (

        <Canvas

            mindmapId={Number(id)}

        />

    );

}