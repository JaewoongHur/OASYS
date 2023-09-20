/* Import */
import styled from "@emotion/styled";
import { ButtonProps } from "@customTypes/commonProps";

// ----------------------------------------------------------------------------------------------------

/* Props Type */
interface TextButtonProps extends ButtonProps {
    category?: "positive" | "negative";
    fontSize?: string;
    disabled?: boolean;
    onClick: () => void;
}

type TextButtonWrapperProps = {
    width: string;
    height: string;
    className: "positive" | "negative";
    fontSize: string;
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
    border-radius: 20px;
    border: 5px solid;

    // Text Attribute
    font-weight: 700;
    font-size: ${(props) => props.fontSize};

    // Interaction Attribute
    transition: 0.3s;
    transform-origin: center;
    user-select: none;
    cursor: pointer;
    &:active {
        transform: scale(0.95);
    }
    &:disabled {
        cursor: default;
        pointer-events: none;
        &:active {
            transform: scale(1);
        }
    }

    // Positive Category Attribute
    &.positive {
        background-color: ${(props) => props.theme.colors.primary3};
        border-color: transparent;
        color: white;
        &:hover {
            background-color: ${(props) => props.theme.colors.primary4};
        }
        &:disabled {
            background-color: ${(props) => props.theme.colors.gray3};
        }
    }

    // Negative Category Attribute
    &.negative {
        background-color: transparent;
        border-color: ${(props) => props.theme.colors.primary3};
        color: ${(props) => props.theme.colors.primary3};
        &:hover {
            background-color: ${(props) => props.theme.colors.primary3};
            color: white;
        }
        &:disabled {
            border-color: ${(props) => props.theme.colors.gray3};
            color: ${(props) => props.theme.colors.gray3};
        }
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
        fontSize = "20px",
        disabled = false,
        onClick,
    } = props;

    return (
        <TextButtonWrapper
            type={type}
            width={width}
            height={height}
            className={category}
            fontSize={fontSize}
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