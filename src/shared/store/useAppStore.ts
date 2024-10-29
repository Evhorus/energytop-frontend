import { create } from "zustand";
import { AuthSliceType, createAuthSlice } from "./createAuthSlice";
import { devtools } from "zustand/middleware";

export const useAppStore = create<AuthSliceType>()(
    devtools((...args) => ({ ...createAuthSlice(...args) }))
);
