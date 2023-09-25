/* Import */
import styled from "@emotion/styled";
import { BoxButton, FloatingActionButton } from "@components/common/button";
import { menuData, serviceData } from "@config/bankingConfig";
import { BlackLogo } from "@assets/images";

// ----------------------------------------------------------------------------------------------------

/* Style */
const JuniorContainer = styled("div")`
    // Size Attribute
    width: 100%;
    height: 100vh;
    overflow-y: hidden;

    // Style Attribute
    background-color: ${(props) => props.theme.colors.primary1};

    // Interaction Attribute
    user-select: none;
`;

const MenuContainer = styled("div")`
    // Position Attribute
    display: flex;
    flex-direction: column;

    // Size Attribute
    padding: 50px;
    box-sizing: border-box;

    // Style Attribute
    background-color: ${(props) => props.theme.colors.gray1};
    border-bottom-left-radius: 50px;
    border-bottom-right-radius: 50px;
`;

const HeaderContainer = styled("div")`
    // Position Attribute
    display: flex;
    justify-content: center;
    align-items: flex-end;
    gap: 1em;

    // Size Attribute
    margin-bottom: 1em;

    // Text Attribute
    color: ${(props) => props.theme.colors.gray7};
`;

const LogoBox = styled("img")`
    // Size Attribute
    width: 60px;
`;

const HeaderTitleWrapper = styled("div")`
    // Text Attribute
    font-size: 50px;
    font-weight: 900;
`;

const HeaderSubTitleWrapper = styled("div")`
    // Size Attribute
    margin-left: 2em;

    // Text Attribute
    font-size: 30px;
    font-weight: 500;
`;

const MenuBox = styled("div")`
    // Position Attribute
    display: flex;
    flex-direction: column;
    gap: 1em;
`;

const MenuRowWrapper = styled("div")`
    // Position Attribute
    display: flex;
    justify-content: center;
    gap: 1em;
`;

const FavoriteContainer = styled("div")`
    // Size Attribute
    padding: 1em 10em;
    box-sizing: border-box;
`;

const TitleWrapper = styled("div")`
    // Size Attribute
    margin-bottom: 0.5em;

    // Text Attribute
    color: ${(props) => props.theme.colors.gray1};
    font-size: 40px;
    font-weight: 800;
`;

const FabContainer = styled("div")`
    // Position Attribute
    display: flex;
    justify-content: space-between;
`;

// ----------------------------------------------------------------------------------------------------

/* Junior Page */
function Junior() {
    return (
        <JuniorContainer>
            <MenuContainer>
                <HeaderContainer>
                    <LogoBox src={BlackLogo} />
                    <HeaderTitleWrapper>오아시스 은행</HeaderTitleWrapper>
                    <HeaderSubTitleWrapper>역삼역 지점</HeaderSubTitleWrapper>
                </HeaderContainer>
                <MenuBox>
                    <MenuRowWrapper>
                        {menuData.map((menu) => {
                            if (menu.id === 0 || menu.id === 1) {
                                return (
                                    <BoxButton
                                        key={menu.id}
                                        width="40%"
                                        text={menu.text}
                                        subText={menu.subText}
                                        iconSrc={menu.iconSrc}
                                    />
                                );
                            }
                            return null;
                        })}
                    </MenuRowWrapper>
                    <MenuRowWrapper>
                        {menuData.map((menu) => {
                            if (menu.id === 2 || menu.id === 3) {
                                return (
                                    <BoxButton
                                        key={menu.id}
                                        width="40%"
                                        text={menu.text}
                                        subText={menu.subText}
                                        iconSrc={menu.iconSrc}
                                    />
                                );
                            }
                            return null;
                        })}
                    </MenuRowWrapper>
                </MenuBox>
            </MenuContainer>
            <FavoriteContainer>
                <TitleWrapper>자주 찾는 서비스</TitleWrapper>
                <FabContainer>
                    {serviceData.map((service) => (
                        <FloatingActionButton key={service.id} width="150px" text={service.text} />
                    ))}
                </FabContainer>
            </FavoriteContainer>
        </JuniorContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default Junior;
