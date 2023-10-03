/* Import */
import { useAuthStore } from "@/store";
import { useState } from "react";
import styled from "@emotion/styled"; // Emotion의 styled를 import합니다.
import Header from "@/components/common/header";
import { useNavigate } from "react-router-dom";

// 스타일 컴포넌트 생성
const CenteredContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh; /* 화면 전체 높이로 설정하여 수직 가운데 정렬합니다. */
`;

const LoginForm = styled.div`
    text-align: center;
`;

function AdminLogin() {
    const login = useAuthStore((state) => state.login);
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        if (username === "ssafy" && password === "dolfin789") {
            login();
            navigate("/admin");
        } else {
            alert("아이디 또는 비밀번호가 올바르지 않습니다.");
        }
    };

    return (
        <>
            <Header />
            <CenteredContainer>
                <LoginForm>
                    <h2>관리자 로그인</h2>
                    <div>
                        <label htmlFor="username">아이디:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">비밀번호:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button onClick={handleLogin}>로그인</button>
                </LoginForm>
            </CenteredContainer>
        </>
    );
}

export default AdminLogin;
