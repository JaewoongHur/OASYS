/* Import */
import styled from "@emotion/styled";
import { ButtonProps } from "@customTypes/componentTypes";
import { lineBreakText } from "@utils/format";

// ----------------------------------------------------------------------------------------------------

/* Props Type */
type FloatingActionButtonWrapperProps = {
    width: string;
    height: string;
};

// ----------------------------------------------------------------------------------------------------

/* Style */
const FloatingActionButtonWrapper = styled("button")<FloatingActionButtonWrapperProps>`
    // Position Attribute
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    // Size Attribute
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    padding-top: 15px;

    // Style Attribute
    background-color: ${(props) => props.theme.colors.gray1};
    border: 10px solid ${(props) => props.theme.colors.gray7};
    border-radius: 50%;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);

    // Text Attribute
    color: ${(props) => props.theme.colors.gray7};
    font-family: "Gangwon Edu Power";
    font-size: 26px;

    // Interaction Attribute
    transition: 0.3s;
    transform-origin: center;
    user-select: none;
    outline: none;
    cursor: pointer;
    &:hover {
        background-color: ${(props) => props.theme.colors.gray7};
        color: ${(props) => props.theme.colors.gray1};
    }
    &:active {
        transform: scale(0.85);
        box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 1);
    }
`;

// ----------------------------------------------------------------------------------------------------

/* Floating Action Button Component */
function FloatingActionButton(props: ButtonProps) {
    const { type = "button", width, height = width, text } = props;

    return (
        <FloatingActionButtonWrapper type={type} width={width} height={height}>
            {lineBreakText(text)}
        </FloatingActionButtonWrapper>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default FloatingActionButton;
