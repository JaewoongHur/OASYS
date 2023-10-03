/* Export */
export interface UserState {
    senior: boolean;
    gender: "MALE" | "FEMALE" | undefined;
    membership: boolean;
    member: {
        id: number;
        name: string;
        phone: string;
    };
    updateUserState: (data: Partial<UserState>) => void;
}

export interface LoginState {
    isAuthenticated: boolean;
    login: () => void;
}

export interface Notification {
    name: string;
    phone: string;
    teller: number;
    waitPeople: number;
    work: string;
}
