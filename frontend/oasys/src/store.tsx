/* Import */
import { create } from "zustand";
import { UserState, LoginState } from "@customTypes/storeTypes";
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

/* Login Store */
const useAuthStore = create<LoginState>((set) => ({
    isAuthenticated: false,
    login: () => set({ isAuthenticated: true }),
}));

// ----------------------------------------------------------------------------------------------------

/* Export */
export { useUserStore, useAuthStore };
