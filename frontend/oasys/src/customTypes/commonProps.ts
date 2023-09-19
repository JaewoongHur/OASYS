/* Export */
export interface ButtonProps {
    type?: "submit" | "reset" | "button";
    width: string;
    height?: string;
    text: string;
}

export interface InputProps {
    type: "text" | "number" | "email" | "password";
    label: string;
    name?: string;
    placeholder?: string;
    error: boolean;
    disabled?: boolean;
    width: string;
    height: string;
    borderRadius: string;
}
