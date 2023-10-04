/* Import */
import styled from "@emotion/styled";
import { InputProps } from "@customTypes/componentTypes";

// ----------------------------------------------------------------------------------------------------

/* Props Type */
type TextAreaWrapperProps = {
    width: string;
    height: string;
};

// ----------------------------------------------------------------------------------------------------

/* Style */
const TextAreaWrapper = styled("div")<TextAreaWrapperProps>`
    // Position Attribute
    z-index: 10;
    flex-grow: 1;

    // Size Attribute
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    max-height: 80vh;
    padding: 20px;
    box-sizing: border-box;
    overflow-y: hidden;

    // Style Attribute
    background-color: transparent;
    border-left: 10px solid ${(props) => props.theme.colors.primary3};

    // Text Attribute
    color: ${(props) => props.theme.colors.gray7};
    font-size: 100px;
    font-weight: 900;

    // Interaction Attribute
    user-select: none;
`;

// ----------------------------------------------------------------------------------------------------

/* Text Area Component */
function TextArea(props: InputProps) {
    const { width, height = "fit-content", value } = props;
    return (
        <TextAreaWrapper width={width} height={height}>
            {value}
        </TextAreaWrapper>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default TextArea;
