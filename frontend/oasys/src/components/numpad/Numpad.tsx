/* Import */
import useUserStore from "@/store";
import { TextButton } from "@components/common/button";
import { TextInput } from "@components/common/input";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";

// ----------------------------------------------------------------------------------------------------

/* Style */
const NumpadContainer = styled("div")`
    z-index: 20;
`;

const NumpadBox = styled("div")`
    display: flex;
    flex-direction: column;
    margin-top: 1em;
    gap: 1em;
`;

const NumpadRowWrapper = styled("div")`
    display: flex;
    justify-content: space-between;
    gap: 1em;
`;

// ----------------------------------------------------------------------------------------------------

/* Numpad Component */
function Numpad() {
    const [id, setId] = useState<number>(0);
    const [name, setName] = useState<string>("");
    const [phone, setPhone] = useState<string>("");

    useEffect(() => {
        const userData = sessionStorage.getItem("user-storage");
        if (userData) {
            const userObject = JSON.parse(userData);
            if (userObject.state.member.id) setId(userObject.state.member.id);
            if (userObject.state.member.name) setName(userObject.state.member.name);
        }
    }, []);

    const updateUserInfo = useUserStore((state) => state.updateUserState);

    const handleButtonClick = (value: string) => {
        if (value === "cancel") {
            setPhone((prevPhone) => prevPhone.slice(0, -1));
        } else {
            setPhone((prevPhone) => prevPhone + value);
        }
    };

    return (
        <NumpadContainer>
            <TextInput
                width="100%"
                height="100px"
                value={phone}
                readOnly
                fontSize="50px"
                placeholder="전화번호"
                onChange={(event) => {
                    setPhone(event.target.value);
                }}
            />
            <NumpadBox>
                <NumpadRowWrapper>
                    <TextButton
                        width="130px"
                        height="130px"
                        text="1"
                        fontSize="80px"
                        onClick={() => handleButtonClick("1")}
                    />
                    <TextButton
                        width="130px"
                        height="130px"
                        text="2"
                        fontSize="80px"
                        onClick={() => handleButtonClick("2")}
                    />
                    <TextButton
                        width="130px"
                        height="130px"
                        text="3"
                        fontSize="80px"
                        onClick={() => handleButtonClick("3")}
                    />
                </NumpadRowWrapper>
                <NumpadRowWrapper>
                    <TextButton
                        width="130px"
                        height="130px"
                        text="4"
                        fontSize="80px"
                        onClick={() => handleButtonClick("4")}
                    />
                    <TextButton
                        width="130px"
                        height="130px"
                        text="5"
                        fontSize="80px"
                        onClick={() => handleButtonClick("5")}
                    />
                    <TextButton
                        width="130px"
                        height="130px"
                        text="6"
                        fontSize="80px"
                        onClick={() => handleButtonClick("6")}
                    />
                </NumpadRowWrapper>
                <NumpadRowWrapper>
                    <TextButton
                        width="130px"
                        height="130px"
                        text="7"
                        fontSize="80px"
                        onClick={() => handleButtonClick("7")}
                    />
                    <TextButton
                        width="130px"
                        height="130px"
                        text="8"
                        fontSize="80px"
                        onClick={() => handleButtonClick("8")}
                    />
                    <TextButton
                        width="130px"
                        height="130px"
                        text="9"
                        fontSize="80px"
                        onClick={() => handleButtonClick("9")}
                    />
                </NumpadRowWrapper>
                <NumpadRowWrapper>
                    <TextButton
                        width="130px"
                        height="130px"
                        text="취소"
                        fontSize="40px"
                        onClick={() => handleButtonClick("cancel")}
                    />
                    <TextButton
                        width="130px"
                        height="130px"
                        text="0"
                        fontSize="80px"
                        onClick={() => handleButtonClick("0")}
                    />
                    <TextButton
                        width="130px"
                        height="130px"
                        text="확인"
                        fontSize="40px"
                        onClick={() => updateUserInfo({ member: { id, name, phone } })}
                    />
                </NumpadRowWrapper>
            </NumpadBox>
        </NumpadContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default Numpad;
