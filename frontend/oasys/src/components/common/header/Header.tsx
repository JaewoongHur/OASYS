/* Import */
import styled from "@emotion/styled";
import { WhiteLogo } from "@assets/images";

// ----------------------------------------------------------------------------------------------------

/* Style */
const HeaderContainer = styled("div")`
    // Position Attribute
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1em;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;

    // Size Attribute
    width: 100%;
    height: 6em;

    // Style Attribute
    background-color: ${(props) => props.theme.colors.gray7};
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;

    // Interaction Attritubte
    user-select: none;
`;

const HeaderIcon = styled("img")`
    // Size Attribute
    width: 50px;
    margin-left: 30px;
`;

const HeaderTextWrapper = styled("div")`
    // Position Attribute
    display: flex;
    align-items: flex-end;
    gap: 3em;

    // Size Attribute
    width: 100%;

    // Style Attribute
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;

    // Text Attribute
    color: white;
`;

const TitleWrapper = styled("div")`
    // Text Attribute
    font-size: 40px;
    font-weight: 700;
`;

const SubTitleWrapper = styled("div")`
    // Text Attribute
    font-size: 20px;
`;

// ----------------------------------------------------------------------------------------------------

/* Header Component */
function Header() {
    return (
        <HeaderContainer>
            <HeaderIcon src={WhiteLogo} alt="White-Logo" />
            <HeaderTextWrapper>
                <TitleWrapper>오아시스 은행</TitleWrapper>
                <SubTitleWrapper>역삼역 지점</SubTitleWrapper>
            </HeaderTextWrapper>
        </HeaderContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default Header;
