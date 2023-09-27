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

export interface NoticeState {
    name: string;
    phone: string;
    teller: number;
    waitPeople: number;
    work: string;
    updateNoticeState: (data: Partial<NoticeState>) => void;
}
