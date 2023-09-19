/* Import */
import styled from "@emotion/styled";
import { ButtonProps } from "@customTypes/commonProps";

// ----------------------------------------------------------------------------------------------------

/* Props Type */
interface TextButtonProps extends ButtonProps {
    category?: "positive" | "negative";
    disabled?: boolean;
    onClick: () => void;
}

type TextButtonWrapperProps = {
    width: string;
    height: string;
    category: "positive" | "negative";
    disabled: boolean;
};

// ----------------------------------------------------------------------------------------------------

/* Style */
const TextButtonWrapper = styled("button")<TextButtonWrapperProps>`
    // Size Attribute
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    padding: 10px 20px;
    box-sizing: border-box;

    // Style Attribute
    background-color: ${(props) => props.theme.colors.primary3};
    border-radius: 20px;
    border: none;

    // Text Attribute
    color: white;
    font-weight: 700;
    font-size: 20px;

    // Interaction Attribute
    transition: 0.3s;
    transform-origin: center;
    cursor: pointer;
    &:hover {
        background-color: ${(props) => props.theme.colors.primary4};
    }
    &:active {
        transform: scale(0.95);
        box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 1);
    }
`;

// ----------------------------------------------------------------------------------------------------

/* Text Button Component */
function TextButton(props: TextButtonProps) {
    const {
        type = "button",
        width,
        height = "100%",
        text,
        category = "positive",
        disabled = false,
        onClick,
    } = props;

    return (
        <TextButtonWrapper
            type={type}
            width={width}
            height={height}
            category={category}
            disabled={disabled}
            onClick={onClick}
        >
            {text}
        </TextButtonWrapper>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default TextButton;
