/* Import */
import styled from "@emotion/styled";
import { ButtonProps } from "@customTypes/commonProps";

// ----------------------------------------------------------------------------------------------------

/* Props Type */
interface BoxButtonProps extends ButtonProps {
    subText: string;
    iconSrc: string;
}

type SizeProps = {
    width: string;
    height: string;
};

// ----------------------------------------------------------------------------------------------------

/* Style */
const BoxButtonWrapper = styled("button")<SizeProps>`
    background-color: ${(props) => props.theme.colors.primary3};
    width: ${(props) => props.width};
    border: 10px solid white;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
    color: white;
    cursor: pointer;
    &:hover {
        background-color: ${(props) => props.theme.colors.primary2};
    }
    &:active {
        box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 1);
    }
`;

const ButtonHeaderWrapper = styled("div")`
    display: flex;
    justify-content: space-between;
    margin: 10px;
    font-family: "Cafe24 Ssurround";
    font-size: 50px;
    font-weight: 700;
`;

const ButtonIcon = styled("img")`
    width: 20%;
`;

const ButtonBodyWrapper = styled("div")`
    margin: 10px;
    font-family: "GmarketSansMedium";
    font-size: 20px;
    text-align: left;
`;

// ----------------------------------------------------------------------------------------------------

/* Box Button Component */
function BoxButton(props: BoxButtonProps) {
    const { type, width, height, text, subText, iconSrc } = props;

    return (
        <BoxButtonWrapper type={type} width={width} height={height}>
            <ButtonHeaderWrapper>
                {text}
                <ButtonIcon src={iconSrc} alt="category-icon" />
            </ButtonHeaderWrapper>
            <ButtonBodyWrapper>{subText}</ButtonBodyWrapper>
        </BoxButtonWrapper>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default BoxButton;
