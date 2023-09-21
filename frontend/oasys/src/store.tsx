/* Import */
import { create } from "zustand";
import { UserState } from "@customTypes/storeTypes";

// ----------------------------------------------------------------------------------------------------

/* User Store */
const useUserStore = create<UserState>(() => ({
    senior: false,
    gender: undefined,
    membership: false,
    member: {
        id: -1,
        name: "",
        phone: "",
    },
}));

// ----------------------------------------------------------------------------------------------------

/* Export */
export default useUserStore;
