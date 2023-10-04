/* Export */
export interface ButtonProps {
    type?: "reset" | "button";
    width: string;
    height?: string;
    text: string;
}

export interface FooterProps {
    isRecording: boolean;
}

export interface AnimationProps {
    isRecording: boolean;
    userGender: "MALE" | "FEMALE" | undefined;
}

export interface InputProps {
    type?: "text" | "number" | "password" | "file";
    width: string;
    height?: string;
    value: string;
}
