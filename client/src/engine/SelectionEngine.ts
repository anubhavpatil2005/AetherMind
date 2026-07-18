export class SelectionEngine {

    selectedNode: number | null = null;

    select(id: number) {

        this.selectedNode = id;

    }

    clear() {

        this.selectedNode = null;

    }

}