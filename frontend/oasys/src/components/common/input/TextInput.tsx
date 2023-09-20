/* Import */
import { ChangeEvent } from "react";
import styled from "@emotion/styled";
import { InputProps } from "@customTypes/commonProps";

// ----------------------------------------------------------------------------------------------------

/* Props Type */
interface TextInputProps extends InputProps {
    readOnly?: boolean;
    label?: string;
    placeholder?: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
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
        label = "",
        placeholder = "",
        onChange,
    } = props;

    return (
        <InputContainer>
            <LabelWrapper htmlFor="text-input">{label}</LabelWrapper>
            <InputWrapper
                type={type}
                id="text-input"
                width={width}
                height={height}
                value={value}
                readOnly={readOnly}
                placeholder={placeholder}
                onChange={onChange}
            />
        </InputContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default TextInput;
