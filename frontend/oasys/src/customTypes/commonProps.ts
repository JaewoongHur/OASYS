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
    borderRadius: string;
    error: boolean;
    disabled: boolean;
}
