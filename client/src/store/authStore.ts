import { create } from "zustand";
import * as authApi from "../api/authApi";

interface User {
    id: number;
    name: string;
    email: string;
}

interface RegisterData {
    name: string;
    email: string;
    password: string;
}

interface LoginData {
    email: string;
    password: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    loading: boolean;
    isAuthenticated: boolean;

    register: (data: RegisterData) => Promise<void>;
    login: (data: LoginData) => Promise<void>;
    logout: () => void;
    fetchProfile: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({

    user: null,

    token: localStorage.getItem("token"),

    loading: false,

    isAuthenticated: !!localStorage.getItem("token"),

    register: async (data) => {

        set({ loading: true });

        try {

            const res = await authApi.register(data);

            localStorage.setItem("token", res.token);

            set({
                token: res.token,
                user: res.user,
                isAuthenticated: true,
                loading: false
            });

        } catch (error) {

            set({ loading: false });

            throw error;

        }

    },

    login: async (data) => {

        set({ loading: true });

        try {

            const res = await authApi.login(data);

            localStorage.setItem("token", res.token);

            set({
                token: res.token,
                user: res.user,
                isAuthenticated: true,
                loading: false
            });

        } catch (error) {

            set({ loading: false });

            throw error;

        }

    },

    logout: () => {

        localStorage.removeItem("token");

        set({
            token: null,
            user: null,
            isAuthenticated: false
        });

    },

    fetchProfile: async () => {

        try {

            const user = await authApi.profile();

            set({
                user,
                isAuthenticated: true
            });

        } catch {

            localStorage.removeItem("token");

            set({
                token: null,
                user: null,
                isAuthenticated: false
            });

        }

    }

}));