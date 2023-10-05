/* Import */
import { create } from "zustand";
import { AuthState, UserState } from "@customTypes/storeTypes";
import { persist, createJSONStorage } from "zustand/middleware";

// ----------------------------------------------------------------------------------------------------

/* User Store */
const useUserStore = create<UserState>()(
    persist(
        (set) => ({
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
        }),
        {
            name: "user-storage",
            storage: createJSONStorage(() => sessionStorage),
        },
    ),
);

/* Auth Store */
const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            isAuth: false,
            updateAuthState: (data: Partial<AuthState>) =>
                set((state) => ({
                    ...state,
                    ...data,
                })),
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => sessionStorage),
        },
    ),
);

// ----------------------------------------------------------------------------------------------------

/* Export */
export { useUserStore, useAuthStore };
