/* Export */
export interface ButtonProps {
    type?: "submit" | "reset" | "button";
    width: string;
    height?: string;
    text: string;
}

export interface InputProps {
    type: "text" | "number" | "email" | "password";
    width: string;
    height: string;
    value: string;
    error: boolean;
    disabled: boolean;
}
