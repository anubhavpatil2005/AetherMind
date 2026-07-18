import Edge from "./Edge";

interface Node {

    id: number;

    x: number;

    y: number;

}

interface GraphEdge {

    id: number;

    source_node_id: number;

    target_node_id: number;

}

interface Props {

    nodes: Node[];

    edges: GraphEdge[];

}

export default function Edges({

    nodes,

    edges

}: Props) {

    return (

        <svg

            width="100%"

            height="100%"

            style={{

                position: "absolute",

                inset: 0,

                overflow: "visible",

                pointerEvents: "none"

            }}

        >

            {

                edges.map(edge => {

                    const source = nodes.find(
                        n => n.id === edge.source_node_id
                    );

                    const target = nodes.find(
                        n => n.id === edge.target_node_id
                    );

                    if (!source || !target) return null;

                    return (

                        <Edge

                            key={edge.id}

                            x1={source.x + 90}

                            y1={source.y + 35}

                            x2={target.x + 90}

                            y2={target.y + 35}

                        />

                    );

                })

            }

        </svg>

    );

}