/* Import */
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { UserState } from "@customTypes/storeTypes";

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

// ----------------------------------------------------------------------------------------------------

/* Export */
export default useUserStore;
