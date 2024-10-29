import { StateCreator } from "zustand";
import { Claims } from "../../auth/interface/Claims";

export type AuthSliceType = {
    tokenAuth: string;
    isAuth: boolean;
    claims: Claims | null;
    setTokenAuth: (tokenAuth: string) => void;
    setClaims: (claims: Claims) => void;
    logout: () => void;
};

export const createAuthSlice: StateCreator<AuthSliceType> = (set) => ({
    tokenAuth: sessionStorage.getItem("AUTH_TOKEN") || "",
    isAuth: !!sessionStorage.getItem("AUTH_TOKEN"),
    claims: JSON.parse(sessionStorage.getItem("USER") || "null"),
    setTokenAuth: (tokenAuth) => {
        sessionStorage.setItem("AUTH_TOKEN", tokenAuth);
        set({ tokenAuth, isAuth: true });
    },
    setClaims: (claims) => {
        sessionStorage.setItem("USER", JSON.stringify(claims));
        set({ claims });
    },
    logout: () => {
        sessionStorage.removeItem("AUTH_TOKEN");
        sessionStorage.removeItem("USER");
        set({ tokenAuth: "", isAuth: false, claims: null });
    },
});
