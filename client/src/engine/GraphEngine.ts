import { useGraphStore } from "../store/graphStore";

export class GraphEngine {

    moveNode(
        id: number,
        x: number,
        y: number
    ) {

        useGraphStore
            .getState()
            .moveNode(id, x, y);

    }

    saveNode(id: number) {

        useGraphStore
            .getState()
            .saveNodePosition(id);

    }

    loadGraph(id: number) {

        return useGraphStore
            .getState()
            .loadGraph(id);

    }

}