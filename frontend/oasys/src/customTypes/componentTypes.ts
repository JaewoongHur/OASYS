/* Export */
export interface AnimationProps {
    isRecording: boolean;
    userGender: "MALE" | "FEMALE" | undefined;
}

export interface ButtonProps {
    type?: "reset" | "button";
    width: string;
    height?: string;
    text: string;
}

export interface DropdownProps {
    width: string;
    height: string;
    placeholder: string;
    optionList: { name: string; value: number }[];
}

export interface FooterProps {
    isRecording: boolean;
}

export interface InputProps {
    type?: "text" | "number" | "password" | "file";
    width: string;
    height?: string;
    value: string;
}

export interface OverlayProps {
    onClick: (event: React.MouseEvent) => void;
}

export interface NumpadButtonProps {
    text: string;
    fontSize: string;
    onClick: () => void;
}
