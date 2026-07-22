import dagre from "dagre";

import {

    GraphNode,

    GraphEdge

} from "../store/graphStore";

export function autoLayoutGraph(

    nodes: GraphNode[],

    edges: GraphEdge[]

): GraphNode[] {

    const graph = new dagre.graphlib.Graph();

    graph.setDefaultEdgeLabel(() => ({}));

    graph.setGraph({

        rankdir: "LR",

        nodesep: 70,

        ranksep: 130

    });

    nodes.forEach((node) => {

        graph.setNode(

            String(node.id),

            {

                width: 220,

                height: 90

            }

        );

    });

    edges.forEach((edge) => {

        graph.setEdge(

            String(edge.source_node_id),

            String(edge.target_node_id)

        );

    });

    dagre.layout(graph);

    return nodes.map((node) => {

        const position = graph.node(

            String(node.id)

        );

        return {

            ...node,

            x: position.x,

            y: position.y

        };

    });

}