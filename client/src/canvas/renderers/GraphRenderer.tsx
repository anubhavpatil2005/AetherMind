import Node from "../Node";
import Edges from "../Edges";

import { useGraphStore } from "../../store/graphStore";

export default function GraphRenderer() {

    const {

        nodes,

        edges,

        moveNode,

        saveNode,

        updateNodeTitle

    } = useGraphStore();

    return (

        <>

            <Edges

                nodes={nodes}

                edges={edges}

            />

            {

                nodes.map((node) => (

                    <Node

                        key={node.id}

                        id={node.id}

                        title={node.title}

                        x={node.x}

                        y={node.y}

                        onMove={moveNode}

                        onSave={saveNode}

                        onTitleChange={updateNodeTitle}

                    />

                ))

            }

        </>

    );

}