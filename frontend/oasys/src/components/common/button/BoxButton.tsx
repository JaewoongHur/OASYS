/* Import */
import React from "react";
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
    // Position Attribute
    display: flex;
    flex-direction: column;

    // Size Attribute
    width: ${(props) => props.width};
    padding: 20px;
    box-sizing: border-box;

    // Effect Attribute
    background-color: ${(props) => props.theme.colors.primary3};
    border: 10px solid white;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);

    // Text Attribute
    color: white;

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

const ButtonHeaderWrapper = styled("div")`
    // Position Attribute
    display: flex;
    justify-content: space-between;
    align-items: center;

    // Size Attribute
    width: auto;
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
    width: auto;
    margin: 10px;

    // Text Attribute
    font-family: "Gmarket Sans Medium";
    font-size: 20px;
    text-align: left;
`;

// ----------------------------------------------------------------------------------------------------

/* Box Button Component */
function BoxButton(props: BoxButtonProps) {
    const { type, width, height, text, subText, iconSrc } = props;

    const splittedSubText = subText.split("\\n").map((line) => (
        <React.Fragment key={line}>
            {line}
            <br />
        </React.Fragment>
    ));

    return (
        <BoxButtonWrapper type={type} width={width} height={height}>
            <ButtonHeaderWrapper>
                <ButtonTitleWrapper>{text}</ButtonTitleWrapper>
                <ButtonIcon src={iconSrc} alt="category-icon" />
            </ButtonHeaderWrapper>
            <ButtonBodyWrapper>{splittedSubText}</ButtonBodyWrapper>
        </BoxButtonWrapper>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default BoxButton;
