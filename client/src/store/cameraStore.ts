import { create } from "zustand";

interface CameraState {

    x: number;

    y: number;

    zoom: number;

    setPosition: (x: number, y: number) => void;

    setZoom: (zoom: number) => void;

}

export const useCameraStore = create<CameraState>((set) => ({

    x: 0,

    y: 0,

    zoom: 1,

    setPosition: (x, y) => set({ x, y }),

    setZoom: (zoom) => set({ zoom })

}));