/* Import */
import { create } from "zustand";
import { UserState, LoginState } from "@customTypes/storeTypes";

// ----------------------------------------------------------------------------------------------------

/* User Store */
const useUserStore = create<UserState>((set) => ({
    senior: false,
    gender: undefined,
    membership: false,
    member: {
        id: -1,
        name: "",
        phone: "",
    },
    // Update User State Function
    updateUserState: (data: Partial<UserState>) =>
        set((state) => ({
            ...state,
            ...data,
        })),
}));

/* Login Store */
const useAuthStore = create<LoginState>((set) => ({
    isAuthenticated: false,
    login: () => set({ isAuthenticated: true }),
}));

// ----------------------------------------------------------------------------------------------------

/* Export */
export { useUserStore, useAuthStore };
