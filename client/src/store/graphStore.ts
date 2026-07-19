import { create } from "zustand";

import { getGraph } from "../api/mindmapApi";
import { updateNode } from "../api/nodeApi";

export interface GraphNode {
    id: number;
    title: string;
    description: string;
    type: string;
    x: number;
    y: number;
    color: string;
}

export interface GraphEdge {
    id: number;
    source_node_id: number;
    target_node_id: number;
    label: string;
}

interface GraphState {

    nodes: GraphNode[];

    edges: GraphEdge[];

    loading: boolean;

    selectedNode: GraphNode | null;

    loadGraph: (
        mindmapId: number
    ) => Promise<void>;

    moveNode: (
        id: number,
        x: number,
        y: number
    ) => void;

    saveNodePosition: (
        id: number
    ) => Promise<void>;

    updateNodeTitle: (
        id: number,
        title: string
    ) => void;

    saveNode: (
        id: number
    ) => Promise<void>;

    selectNode: (
        node: GraphNode | null
    ) => void;

    setNodes: (
        nodes: GraphNode[]
    ) => void;

}

export const useGraphStore = create<GraphState>((set, get) => ({

    nodes: [],

    edges: [],

    loading: false,

    selectedNode: null,

    async loadGraph(mindmapId: number) {

        try {

            set({
                loading: true
            });

            const graph = await getGraph(mindmapId);

            set({

                nodes: graph.nodes,

                edges: graph.edges,

                loading: false

            });

        } catch (err) {

            console.error(err);

            set({
                loading: false
            });

        }

    },

    moveNode(id, x, y) {

        set((state) => ({

            nodes: state.nodes.map((node) =>

                node.id === id

                    ? {
                          ...node,
                          x,
                          y
                      }

                    : node

            )

        }));

    },

    async saveNodePosition(id) {

        const node = get().nodes.find(

            (n) => n.id === id

        );

        if (!node) return;

        try {

            await updateNode(id, {

                title: node.title,

                description: node.description,

                type: node.type,

                x: node.x,

                y: node.y,

                color: node.color

            });

        } catch (err) {

            console.error(err);

        }

    },

    updateNodeTitle(id, title) {

        set((state) => ({

            nodes: state.nodes.map((node) =>

                node.id === id

                    ? {

                          ...node,

                          title

                      }

                    : node

            )

        }));

    },

    async saveNode(id) {

        const node = get().nodes.find(

            (n) => n.id === id

        );

        if (!node) return;

        try {

            await updateNode(id, {

                title: node.title,

                description: node.description,

                type: node.type,

                x: node.x,

                y: node.y,

                color: node.color

            });

        } catch (err) {

            console.error(err);

        }

    },

    selectNode(node) {

        set({

            selectedNode: node

        });

    },

    setNodes(nodes) {

        set({

            nodes

        });

    }

}));