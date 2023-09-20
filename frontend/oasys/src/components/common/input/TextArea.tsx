/* Import */
import styled from "@emotion/styled";
import { InputProps } from "@customTypes/commonProps";

// ----------------------------------------------------------------------------------------------------

/* Props Type */
type TextAreaWrapperProps = {
    width: string;
    height: string;
};

// ----------------------------------------------------------------------------------------------------

/* Style */
const TextAreaWrapper = styled("div")<TextAreaWrapperProps>`
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
    const { width, height = "100%", value } = props;
    return (
        <TextAreaWrapper width={width} height={height}>
            {value}
        </TextAreaWrapper>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default TextArea;
