import { create } from "zustand";

interface CameraState {
    x: number;
    y: number;
    zoom: number;

    setCamera: (x: number, y: number, zoom: number) => void;

    moveCamera: (dx: number, dy: number) => void;

    setZoom: (zoom: number) => void;
}

export const useCameraStore = create<CameraState>((set) => ({

    x: 0,

    y: 0,

    zoom: 1,

    setCamera: (x, y, zoom) =>
        set({
            x,
            y,
            zoom
        }),

    moveCamera: (dx, dy) =>
        set((state) => ({
            x: state.x + dx,
            y: state.y + dy
        })),

    setZoom: (zoom) =>
        set({
            zoom
        })

}));