/* Import */
import { AttendantAnimation, WaveAnimation } from "@components/common/animation";
import { BoxButton, FloatingActionButton } from "@components/common/button";
import { BlackLogo } from "@assets/images";
import { menuData, serviceData } from "@config/bankingConfig";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";

// ----------------------------------------------------------------------------------------------------

/* Style */
const JuniorContainer = styled("div")`
    // Position Attribute
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    // Size Attribute
    height: 100vh;
    overflow: hidden;

    // Style Attribute
    background-color: ${(props) => props.theme.colors.gray1};

    // Interaction Attribute
    user-select: none;
`;

const JuniorBodyContainer = styled("div")`
    // Position Attribute
    display: flex;
    justify-content: left;
    align-items: center;

    // Size Attribute
    width: 100%;
`;

const JuniorBox = styled("div")`
    // Position Attribute
    z-index: 10;

    // Size Attribute
    width: 100%;
    height: 100vh;
    overflow-y: hidden;

    // Interaction Attribute
    user-select: none;
`;

const MenuContainer = styled("div")`
    // Position Attribute
    display: flex;
    flex-direction: column;

    // Size Attribute
    padding: 50px 0;
    box-sizing: border-box;
`;

const HeaderContainer = styled("div")`
    // Position Attribute
    display: flex;
    justify-content: center;
    align-items: flex-end;
    gap: 1em;

    // Size Attribute
    margin-bottom: 2em;

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
    padding: 20px;
    box-sizing: border-box;
`;

const TitleWrapper = styled("div")`
    // Size Attribute
    margin-bottom: 0.5em;

    // Text Attribute
    color: ${(props) => props.theme.colors.gray7};
    font-size: 40px;
    font-weight: 800;
    text-align: center;
`;

const FabContainer = styled("div")`
    // Position Attribute
    display: flex;
    justify-content: space-between;
`;

// ----------------------------------------------------------------------------------------------------

/* Junior Page */
function Junior() {
    const [gender, setGender] = useState<"MALE" | "FEMALE" | undefined>(undefined);

    useEffect(() => {
        const userData = sessionStorage.getItem("user-storage");
        if (userData) {
            const userObject = JSON.parse(userData);
            if (userObject.state.gender) setGender(userObject.state.gender);
        }
    }, []);

    return (
        <JuniorContainer>
            <JuniorBodyContainer>
                <AttendantAnimation isRecording userGender={gender} />
                <JuniorBox>
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
                                                width="45%"
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
                                                width="45%"
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
                                <FloatingActionButton
                                    key={service.id}
                                    width="130px"
                                    text={service.text}
                                />
                            ))}
                        </FabContainer>
                    </FavoriteContainer>
                </JuniorBox>
            </JuniorBodyContainer>
            <WaveAnimation />
        </JuniorContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default Junior;
