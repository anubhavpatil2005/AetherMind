import { GraphEngine } from "./GraphEngine";
import { CameraEngine } from "./CameraEngine";
import { HistoryEngine } from "./HistoryEngine";
import { SelectionEngine } from "./SelectionEngine";

class CanvasEngine {

    graph = new GraphEngine();

    camera = new CameraEngine();

    history = new HistoryEngine();

    selection = new SelectionEngine();

}

export const canvasEngine = new CanvasEngine();