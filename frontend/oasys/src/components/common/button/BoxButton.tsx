/* Import */
import styled from "@emotion/styled";
import { ButtonProps } from "@customTypes/commonProps";
import lineBreakText from "@utils/format";

// ----------------------------------------------------------------------------------------------------

/* Props Type */
interface BoxButtonProps extends ButtonProps {
    subText: string;
    iconSrc: string;
}

type BoxButtonWrapperProps = {
    width: string;
    height: string;
};

// ----------------------------------------------------------------------------------------------------

/* Style */
const BoxButtonWrapper = styled("button")<BoxButtonWrapperProps>`
    // Position Attribute
    display: flex;
    flex-direction: column;

    // Size Attribute
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    padding: 20px;
    box-sizing: border-box;

    // Style Attribute
    background-color: ${(props) => props.theme.colors.primary3};
    border: 10px solid white;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);

    // Text Attribute
    color: white;

    // Interaction Attribute
    transition: 0.3s;
    transform-origin: center;
    user-select: none;
    cursor: pointer;
    &:hover {
        background-color: ${(props) => props.theme.colors.primary4};
    }
    &:active {
        transform: scale(0.95);
        box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 1);
    }
`;

const ButtonHeaderWrapper = styled("div")`
    // Position Attribute
    display: flex;
    justify-content: space-between;
    align-items: center;

    // Size Attribute
    width: calc(100% - 20px);
    height: 50px;
    margin: 10px;
`;

const ButtonTitleWrapper = styled("div")`
    // Text Attribute
    font-family: "Cafe24 Ssurround";
    font-size: 50px;
`;

const ButtonIcon = styled("img")`
    // Size Attribute
    height: 100%;
`;

const ButtonBodyWrapper = styled("div")`
    // Size Attribute
    width: calc(100% - 20px);
    margin: 10px;
    box-sizing: border-box;

    // Text Attribute
    font-family: "Gmarket Sans Medium";
    font-size: 20px;
    text-align: left;
`;

// ----------------------------------------------------------------------------------------------------

/* Box Button Component */
function BoxButton(props: BoxButtonProps) {
    const { type = "button", width, height = "100%", text, subText, iconSrc } = props;

    return (
        <BoxButtonWrapper type={type} width={width} height={height}>
            <ButtonHeaderWrapper>
                <ButtonTitleWrapper>{text}</ButtonTitleWrapper>
                <ButtonIcon src={iconSrc} alt="category-icon" />
            </ButtonHeaderWrapper>
            <ButtonBodyWrapper>{lineBreakText(subText)}</ButtonBodyWrapper>
        </BoxButtonWrapper>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default BoxButton;
