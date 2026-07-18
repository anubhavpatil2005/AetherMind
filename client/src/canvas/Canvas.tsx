import { useEffect } from "react";

import Grid from "./Grid";

import CameraController from "./controllers/CameraController";
import InteractionController from "./controllers/InteractionController";
import GraphRenderer from "./renderers/GraphRenderer";

import { useCameraStore } from "../store/cameraStore";
import { useGraphStore } from "../store/graphStore";

interface CanvasProps {
    mindmapId: number;
}

export default function Canvas({
    mindmapId
}: CanvasProps) {

    const {
        x,
        y,
        zoom
    } = useCameraStore();

    const {
        loading,
        loadGraph
    } = useGraphStore();

    useEffect(() => {

        if (!mindmapId) return;

        loadGraph(mindmapId);

    }, [mindmapId, loadGraph]);

    if (loading) {

        return (

            <div
                style={{
                    width: "100vw",
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "#0F172A",
                    color: "white",
                    fontSize: 22
                }}
            >
                Loading Graph...
            </div>

        );

    }

    return (

        <InteractionController>

            <Grid
                x={x}
                y={y}
                zoom={zoom}
            />

            <CameraController>

                <GraphRenderer />

            </CameraController>

        </InteractionController>

    );

}