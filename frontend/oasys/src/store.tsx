/* Import */
import { create } from "zustand";
import { UserState } from "@customTypes/storeTypes";

// ----------------------------------------------------------------------------------------------------

/* User Store */
const useUserStore = create<UserState>((set) => ({
    senior: false,
    gender: undefined, // 기본값으로 undefined 설정
    membership: false,
    member: {
        id: -1,
        name: "",
        phone: "",
    },
    // userInfo 상태를 업데이트하는 액션
    updateUserInfo: (data: Partial<UserState>) =>
        set((state) => ({
            ...state,
            ...data,
        })),
}));

// ----------------------------------------------------------------------------------------------------

/* Export */
export default useUserStore;
