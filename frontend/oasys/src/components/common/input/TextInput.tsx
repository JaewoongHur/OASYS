/* Import */
import { ChangeEvent } from "react";
import styled from "@emotion/styled";
import { InputProps } from "@customTypes/componentTypes";

// ----------------------------------------------------------------------------------------------------

/* Props Type */
interface TextInputProps extends InputProps {
    readOnly?: boolean;
    fontSize?: string;
    label?: string;
    placeholder?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    onClick?: (event: React.MouseEvent) => void;
    onKeyDown?: (event: React.KeyboardEvent) => void;
}

type InputWrapperProps = {
    width: string;
    height: string;
    fontSize: string;
};

// ----------------------------------------------------------------------------------------------------

/* Style */
const InputContainer = styled("div")`
    // Position Attribute
    display: flex;
    flex-direction: column;
    gap: 0.5em;
`;

const LabelWrapper = styled("label")`
    // Text Attribute
    color: ${(props) => props.theme.colors.primary3};
    font-size: 18px;
    font-weight: 700;

    // Interaction Attribute
    user-select: none;
`;
const InputWrapper = styled("input")<InputWrapperProps>`
    // Size Attribute
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    padding: 10px;
    box-sizing: border-box;

    // Style Attribute
    background-color: ${(props) => props.theme.colors.gray1};
    border: 5px solid ${(props) => props.theme.colors.primary3};
    border-radius: 20px;

    // Text Attribute
    color: ${(props) => props.theme.colors.gray7};
    font-weight: 700;
    font-size: ${(props) => props.fontSize};

    // Interaction Attribute
    transition: 0.3s;
    outline: none;
    :focus {
        box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.5);
    }
`;

// ----------------------------------------------------------------------------------------------------

/* Text Input Component */
function TextInput(props: TextInputProps) {
    const {
        type = "text",
        width,
        height = "100%",
        value,
        readOnly = false,
        fontSize = "16px",
        label = "",
        placeholder = "",
        onChange,
        onClick,
        onKeyDown,
    } = props;

    // Make Input ID
    const inputId = `input-${label}`;

    return (
        <InputContainer onClick={onClick}>
            <LabelWrapper htmlFor={inputId}>{label}</LabelWrapper>
            <InputWrapper
                type={type}
                width={width}
                height={height}
                id={inputId}
                value={value.trim()}
                readOnly={readOnly}
                fontSize={fontSize}
                placeholder={placeholder}
                onChange={onChange}
                onKeyDown={onKeyDown}
                autoComplete="off"
            />
        </InputContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default TextInput;
