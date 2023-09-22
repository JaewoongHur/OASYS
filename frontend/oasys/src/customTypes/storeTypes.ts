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
}

export interface Notification {
    name: string;
    phone: string;
    teller: number;
    waitPeople: number;
    work: string;
}
