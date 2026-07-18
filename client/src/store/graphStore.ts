import { create } from "zustand";

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

    selectedNode: GraphNode | null;

    setNodes: (nodes: GraphNode[]) => void;

    setEdges: (edges: GraphEdge[]) => void;

    selectNode: (node: GraphNode | null) => void;

}

export const useGraphStore = create<GraphState>((set) => ({

    nodes: [],

    edges: [],

    selectedNode: null,

    setNodes: (nodes) => set({ nodes }),

    setEdges: (edges) => set({ edges }),

    selectNode: (node) => set({ selectedNode: node })

}));