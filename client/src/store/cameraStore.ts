import { create } from "zustand";

interface CameraState {
    x: number;
    y: number;
    zoom: number;

    setPosition: (x: number, y: number) => void;
    move: (dx: number, dy: number) => void;
    zoomIn: (delta: number) => void;
}

export const useCameraStore = create<CameraState>((set) => ({
    x: 0,
    y: 0,
    zoom: 1,

    setPosition: (x, y) =>
        set({
            x,
            y
        }),

    move: (dx, dy) =>
        set((state) => ({
            x: state.x + dx,
            y: state.y + dy
        })),

    zoomIn: (delta) =>
        set((state) => ({
            zoom: Math.max(
                0.25,
                Math.min(state.zoom + delta, 3)
            )
        }))
}));