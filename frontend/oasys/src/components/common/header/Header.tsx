/* Import */
import styled from "@emotion/styled";
import { OasysLogo } from "@assets/images";

// ----------------------------------------------------------------------------------------------------

/* Style */
const HeaderContainer = styled("div")`
    // Flexbox 속성 추가
    display: flex;
    justify-content: center;
    align-items: center;

    // Position Attribute
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;

    // Size Attribute
    width: 100%;
    height: 8em;

    //Background Color
    background-color: ${(props) => props.theme.colors.gray7};

    //radius config
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;

    user-select: none;
`;

const HeaderIcon = styled("img")`
    // Size Attribute
    width: 50px;
    margin-left: 30px;
`;

const HeaderTextWrapper = styled("div")`
    display: flex;
    align-items: flex-end;
    // Size Attribute
    width: 100%;

    // Style Attribute
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;

    // Text Attribute
    color: white;
    font-size: 40px;
    font-weight: 700;
`;

const HeaderMain = styled("div")`
    font-size: 50px;
    margin-right: 20px;
    margin-left: 20px;
`;

const HeaderSub = styled("div")``;

// ----------------------------------------------------------------------------------------------------

/* Header Component */
function Header() {
    return (
        <HeaderContainer>
            <HeaderIcon src={OasysLogo} alt="Oasys-Logo" />
            <HeaderTextWrapper>
                <HeaderMain>오아시스 은행</HeaderMain>
                <HeaderSub>역삼역 지점</HeaderSub>
            </HeaderTextWrapper>
        </HeaderContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default Header;
