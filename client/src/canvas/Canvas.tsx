import { useRef } from "react";

import Grid from "./Grid";
import Viewport from "./Viewport";
import Node from "./Node";
import Edges from "./Edges";
import { useCameraStore } from "../store/cameraStore";

export default function Canvas() {

    const x = useCameraStore((state) => state.x);
    const y = useCameraStore((state) => state.y);
    const zoom = useCameraStore((state) => state.zoom);
    const move = useCameraStore((state) => state.move);
    const zoomIn = useCameraStore((state) => state.zoomIn);

    const dragging = useRef(false);

    const previous = useRef({
        x: 0,
        y: 0
    });

    const nodes = [

        {
            id: 1,
            title: "Artificial Intelligence",
            x: 200,
            y: 120
        },

        {
            id: 2,
            title: "Machine Learning",
            x: 520,
            y: 260
        },

        {
            id: 3,
            title: "Deep Learning",
            x: 840,
            y: 180
        }

    ];

    const edges = [

        {
            id: 1,
            source_node_id: 1,
            target_node_id: 2
        },

        {
            id: 2,
            source_node_id: 2,
            target_node_id: 3
        }

    ];

    function onMouseDown(
        e: React.MouseEvent
    ) {

        dragging.current = true;

        previous.current = {

            x: e.clientX,

            y: e.clientY

        };

    }

    function onMouseMove(
        e: React.MouseEvent
    ) {

        if (!dragging.current) return;

        const dx =
            e.clientX -
            previous.current.x;

        const dy =
            e.clientY -
            previous.current.y;

        move(dx, dy);

        previous.current = {

            x: e.clientX,

            y: e.clientY

        };

    }

    function onMouseUp() {

        dragging.current = false;

    }

    function onWheel(
        e: React.WheelEvent
    ) {

        e.preventDefault();

        zoomIn(
            e.deltaY > 0
                ? -0.1
                : 0.1
        );

    }

    return (

        <div
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onWheel={onWheel}
            style={{
                width: "100vw",
                height: "100vh",
                overflow: "hidden",
                position: "relative",
                background: "#0f172a",
                cursor: dragging.current ? "grabbing" : "grab"
            }}
        >

            <Grid
                x={x}
                y={y}
                zoom={zoom}
            />

            <Viewport
                x={x}
                y={y}
                zoom={zoom}
            >

                {/* SVG Connections */}

                <Edges
                    nodes={nodes}
                    edges={edges}
                />

                {/* Render Nodes */}

                {
                    nodes.map(node => (

                        <Node
                            key={node.id}
                            title={node.title}
                            x={node.x}
                            y={node.y}
                        />

                    ))
                }

            </Viewport>

        </div>

    );

}