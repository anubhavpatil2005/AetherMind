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

    search: string;

    loadGraph: (

        mindmapId: number

    ) => Promise<void>;

    moveNode: (

        id: number,

        x: number,

        y: number

    ) => void;

    updateNodeLocal: (

        id: number,

        changes: Partial<GraphNode>

    ) => void;

    updateNodeTitle: (

        id: number,

        title: string

    ) => void;

    saveNode: (

        id: number

    ) => Promise<void>;

    saveNodePosition: (

        id: number

    ) => Promise<void>;

    selectNode: (

        node: GraphNode | null

    ) => void;

    setSearch: (

        value: string

    ) => void;

    setNodes: (

        nodes: GraphNode[]

    ) => void;

    addNode: (

        node: GraphNode

    ) => void;

    addEdge: (

        edge: GraphEdge

    ) => void;

    removeNode: (

        id: number

    ) => void;

    removeEdgesByNode: (

        nodeId: number

    ) => void;

}

export const useGraphStore = create<GraphState>((set, get) => ({

    nodes: [],

    edges: [],

    loading: false,

    selectedNode: null,

    search: "",

    async loadGraph(mindmapId: number) {

        try {

            set({

                loading: true

            });

            const graph = await getGraph(

                mindmapId

            );

            set({

                nodes: graph.nodes,

                edges: graph.edges,

                loading: false

            });

        }

        catch (err) {

            console.error(err);

            set({

                loading: false

            });

        }

    },

    moveNode(id, x, y) {

        get().updateNodeLocal(

            id,

            {

                x,

                y

            }

        );

    },

    updateNodeLocal(id, changes) {

        set((state) => ({

            nodes: state.nodes.map(

                (node) =>

                    node.id === id

                        ? {

                              ...node,

                              ...changes

                          }

                        : node

            )

        }));

    },

    updateNodeTitle(id, title) {

        get().updateNodeLocal(

            id,

            {

                title

            }

        );

    },

    async saveNodePosition(id) {

        await get().saveNode(id);

    },

    async saveNode(id) {

        const node = get().nodes.find(

            (n) => n.id === id

        );

        if (!node) return;

        try {

            await updateNode(

                id,

                {

                    title: node.title,

                    description: node.description,

                    type: node.type,

                    x: node.x,

                    y: node.y,

                    color: node.color

                }

            );

        }

        catch (err) {

            console.error(err);

        }

    },

    selectNode(node) {

        set({

            selectedNode: node

        });

    },

    setSearch(value) {

        set({

            search: value

        });

    },

    setNodes(nodes) {

        set({

            nodes

        });

    },

    addNode(node) {

        set((state) => ({

            nodes: [

                ...state.nodes,

                node

            ]

        }));

    },

    addEdge(edge) {

        set((state) => ({

            edges: [

                ...state.edges,

                edge

            ]

        }));

    },

    removeNode(id) {

        set((state) => ({

            nodes: state.nodes.filter(

                (node) =>

                    node.id !== id

            )

        }));

    },

    removeEdgesByNode(nodeId) {

        set((state) => ({

            edges: state.edges.filter(

                (edge) =>

                    edge.source_node_id !== nodeId &&

                    edge.target_node_id !== nodeId

            )

        }));

    }

}));