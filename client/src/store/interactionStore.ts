import { create } from "zustand";

interface InteractionState {

    draggingNode:boolean;

    setDraggingNode:(value:boolean)=>void;

}

export const useInteractionStore=create<InteractionState>((set)=>({

    draggingNode:false,

    setDraggingNode:(value)=>set({

        draggingNode:value

    })

}));