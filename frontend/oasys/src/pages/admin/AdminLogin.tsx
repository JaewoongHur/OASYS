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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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

const IDWrapper = styled("div")``;

const IDLabel = styled.label`
    font-size: 24px;
    font-weight: 700;
`;

const PWContainer = styled("div")`
    display: flex;
    width: 60%;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 50px;
`;

const PWWrapper = styled("div")``;

const PWLabel = styled.label`
    font-size: 24px;
    font-weight: 700;
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
            routeTo("/admin");
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
            <LoginHeader>관리자 페이지 로그인</LoginHeader>
            <IDContainer>
                <IDWrapper>
                    <IDLabel htmlFor="username">아이디</IDLabel>
                </IDWrapper>
                <TextInput
                    width="100%"
                    value={username}
                    placeholder="아이디를 입력하세요."
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </IDContainer>
            <PWContainer>
                <PWWrapper>
                    <PWLabel htmlFor="password">비밀번호</PWLabel>
                </PWWrapper>
                <TextInput
                    width="100%"
                    type="password"
                    value={password}
                    placeholder="비밀번호를 입력하세요."
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </PWContainer>
            <TextButton
                width="25%"
                height="50px"
                text="로그인"
                onKeyDown={handleKeyDown}
                onClick={handleLogin}
                tabIndex={0}
            />
        </LoginContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default AdminLogin;
