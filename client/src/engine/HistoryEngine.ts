export class HistoryEngine {

    undoStack: any[] = [];

    redoStack: any[] = [];

    push(command: any) {

        this.undoStack.push(command);

    }

    undo() {

        const cmd = this.undoStack.pop();

        if (!cmd) return;

        cmd.undo();

        this.redoStack.push(cmd);

    }

    redo() {

        const cmd = this.redoStack.pop();

        if (!cmd) return;

        cmd.execute();

        this.undoStack.push(cmd);

    }

}