/* Import */
import AdminLoginModal from "@components/modal/admin";
import React, { useState } from "react";
import styled from "@emotion/styled";
import { TextInput } from "@components/common/input";
import { TextButton } from "@components/common/button";
import { useAuthStore } from "@/store";
import useRouter from "@hooks/useRouter";

// ----------------------------------------------------------------------------------------------------

/* Style */
const LoginContainer = styled("div")`
    // Size Attribute
    width: 100%;
    height: 100vh;

    // Style Attribute
    background-color: ${(props) => props.theme.colors.gray1};

    // Interaction Attribute
    user-select: none;
`;

const LoginBox = styled("div")`
    // Position Attribute
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    // Size Attribute
    width: 50%;
    height: 100vh;
    margin: auto;
`;

const TitleWrapper = styled("div")`
    // Size Attribute
    margin-bottom: 1em;

    // Text Attribute
    font-size: 40px;
    font-weight: 700;
    color: ${(props) => props.theme.colors.gray7};
`;

const InputContainer = styled("div")`
    // Position Attribute
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1em;

    // Size Attribute
    width: 60%;
    margin-bottom: 3em;
`;

const ButtonContainer = styled("div")`
    // Position Attribute
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5%;

    // Size Attribute
    width: 100%;
`;

// ----------------------------------------------------------------------------------------------------

/* Admin Login Component */
function AdminLogin() {
    const [id, setId] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isError, setIsError] = useState<boolean>(false);
    const { routeTo } = useRouter();
    const updateAuthState = useAuthStore((state) => state.updateAuthState);
    const { VITE_ADMIN_ID, VITE_ADMIN_PASSWORD } = import.meta.env;

    // Handle Login Request
    const handleLogin = () => {
        if (id === VITE_ADMIN_ID && password === VITE_ADMIN_PASSWORD) {
            updateAuthState({ isAuth: true });
            routeTo("/main");
        } else {
            setIsError(true);
        }
    };

    // Handle Enter Key Press
    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleLogin();
        }
    };

    return (
        <LoginContainer>
            <LoginBox>
                <TitleWrapper>관리자 페이지 로그인</TitleWrapper>
                <InputContainer>
                    <TextInput
                        width="100%"
                        value={id}
                        label="아이디"
                        placeholder="아이디를 입력하세요."
                        onChange={(event) => setId(event.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <TextInput
                        type="password"
                        width="100%"
                        value={password}
                        label="비밀번호"
                        placeholder="비밀번호를 입력하세요."
                        onChange={(event) => setPassword(event.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </InputContainer>
                <ButtonContainer>
                    <TextButton
                        width="20%"
                        height="50px"
                        text="로그인"
                        onKeyDown={handleKeyDown}
                        onClick={handleLogin}
                        tabIndex={0}
                    />
                    <TextButton
                        width="35%"
                        height="50px"
                        text="키오스크 화면으로 이동"
                        category="negative"
                        onClick={() => routeTo("/home")}
                    />
                </ButtonContainer>
            </LoginBox>
            {isError && <AdminLoginModal openModal={isError} getModal={() => setIsError(false)} />}
        </LoginContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default AdminLogin;
