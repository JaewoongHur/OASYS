/* Import */
import { useAuthStore } from "@/store";
import React, { useState } from "react";
import styled from "@emotion/styled";
import { TextInput } from "@components/common/input";
import { TextButton } from "@components/common/button";
import useRouter from "@hooks/useRouter";

// ----------------------------------------------------------------------------------------------------

/* Style */
const LoginContainer = styled("div")`
    // Size Attribute
    width: 100%;

    // Style Attribute
    background-color: ${(props) => props.theme.colors.gray1};
`;

const LoginWrapper = styled("div")`
    // Position Attribute
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    // Size Attribute
    width: 50%;
    height: 100vh;
    margin: 0 auto;
    margin-top: 50px;
`;

const LoginHeader = styled("div")`
    width: 100%;
    text-align: center;
    font-size: 36px;
    font-weight: 700;
    margin-bottom: 30px;
`;

const IDContainer = styled("div")`
    display: flex;
    width: 60%;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 10px;
`;

const PWContainer = styled("div")`
    display: flex;
    width: 60%;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 50px;
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
    const updateAuthState = useAuthStore((state) => state.updateAuthState);
    const { routeTo } = useRouter();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    /* Admin ID and Password */
    const { VITE_ADMIN_ID, VITE_ADMIN_PASSWORD } = import.meta.env;

    const handleLogin = () => {
        if (username === VITE_ADMIN_ID && password === VITE_ADMIN_PASSWORD) {
            updateAuthState({ isAuth: true });
            routeTo("/main");
        } else {
            alert("아이디 또는 비밀번호가 올바르지 않습니다.");
        }
    };
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleLogin();
        }
    };

    return (
        <LoginContainer>
            <LoginWrapper>
                <LoginHeader>관리자 페이지 로그인</LoginHeader>
                <IDContainer>
                    <TextInput
                        width="100%"
                        value={username}
                        label="아이디"
                        placeholder="아이디를 입력하세요."
                        onChange={(e) => setUsername(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </IDContainer>
                <PWContainer>
                    <TextInput
                        width="100%"
                        type="password"
                        value={password}
                        label="비밀번호"
                        placeholder="비밀번호를 입력하세요."
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </PWContainer>
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
            </LoginWrapper>
        </LoginContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default AdminLogin;
