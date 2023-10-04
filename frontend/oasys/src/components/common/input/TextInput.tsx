/* Import */
import { ChangeEvent } from "react";
import styled from "@emotion/styled";
import { InputProps } from "@customTypes/componentTypes";

// ----------------------------------------------------------------------------------------------------

/* Props Type */
interface TextInputProps extends InputProps {
    readOnly?: boolean;
    label?: string;
    placeholder?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    onClick?: (event: React.MouseEvent) => void;
    onKeyDown?: (event: React.KeyboardEvent) => void;
}

type InputWrapperProps = {
    width: string;
    height: string;
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
    font-weight: 700;

    // Interaction Attribute
    user-select: none;
`;
const InputIconWrapper = styled("div")<InputWrapperProps>`
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

    // Interaction Attribute
    transition: 0.3s;
    outline: none;
    :focus {
        box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.5);
    }
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const InputWrapper = styled("input")`
    width: 100%;
    border: none;
    outline: none;
    background-color: transparent;
    cursor: pointer;
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
        label = "",
        placeholder = "",
        onChange,
        onClick,
        onKeyDown,
    } = props;

    return (
        <InputContainer onClick={onClick}>
            <LabelWrapper htmlFor="text-input">{label}</LabelWrapper>
            <InputIconWrapper width={width} height={height}>
                <InputWrapper
                    type={type}
                    id="text-input"
                    value={value}
                    readOnly={readOnly}
                    placeholder={placeholder}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                />
            </InputIconWrapper>
        </InputContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default TextInput;
