import { useParams } from "react-router-dom";

import Canvas from "../canvas/Canvas";

export default function MindMapPage() {

    const { id } = useParams();

    return (

        <Canvas
            mindmapId={Number(id)}
        />

    );

}