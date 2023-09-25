/* Import */
import { create } from "zustand";
import { UserState } from "@customTypes/storeTypes";

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

// ----------------------------------------------------------------------------------------------------

/* Export */
export default useUserStore;
