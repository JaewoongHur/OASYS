/* Import */
import { formatPhoneNumber } from "@utils/format";
import { NumpadButtonProps } from "@customTypes/componentTypes";
import { TextButton } from "@components/common/button";
import { TextInput } from "@components/common/input";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useUserStore } from "@/store";

// ----------------------------------------------------------------------------------------------------

/* Style */
const NumpadContainer = styled("div")`
    // Position Attribute
    z-index: 20;

    // Size Attribute
    margin-left: 500px;
    margin-bottom: 50px;
    width: 450px;
`;

const NumpadBox = styled("div")`
    // Position Attribute
    display: flex;
    flex-direction: column;
    gap: 1em;

    // Size Attribute
    margin-top: 1em;
`;

const NumpadRowWrapper = styled("div")`
    // Position Attribute
    display: flex;
    justify-content: space-between;
    gap: 1em;
`;

// ----------------------------------------------------------------------------------------------------

/* Numpad Button Component */
function NumpadButton({ text, fontSize, onClick }: NumpadButtonProps) {
    return (
        <TextButton
            width="130px"
            height="130px"
            text={text}
            fontSize={fontSize}
            onClick={onClick}
        />
    );
}

/* Numpad Component */
function Numpad() {
    const [id, setId] = useState<number>(0);
    const [name, setName] = useState<string>("");
    const [phone, setPhone] = useState<string>("010");
    const faceId = "";
    const subId = "";
    const updateUserInfo = useUserStore((state) => state.updateUserState);

    // Change Phone Number Input Text
    const handleButtonClick = (value: string) => {
        if (value === "cancel") {
            if (phone.length > 3) setPhone((prevPhone) => prevPhone.slice(0, -1));
        } else if (phone.length < 12) {
            setPhone((prevPhone) => prevPhone + value);
        }
    };

    // Load User ID and Name Info
    useEffect(() => {
        const userData = sessionStorage.getItem("user-storage");
        if (userData) {
            const userObject = JSON.parse(userData);
            if (userObject.state.member.id) setId(userObject.state.member.id);
            if (userObject.state.member.name) setName(userObject.state.member.name);
        }
    }, []);

    return (
        <NumpadContainer>
            <TextInput
                width="100%"
                height="100px"
                value={formatPhoneNumber(phone)}
                readOnly
                fontSize="50px"
                onChange={(event) => {
                    setPhone(event.target.value);
                }}
            />
            <NumpadBox>
                <NumpadRowWrapper>
                    {[1, 2, 3].map((number) => (
                        <NumpadButton
                            key={number}
                            text={String(number)}
                            fontSize="80px"
                            onClick={() => handleButtonClick(String(number))}
                        />
                    ))}
                </NumpadRowWrapper>
                <NumpadRowWrapper>
                    {[4, 5, 6].map((number) => (
                        <NumpadButton
                            key={number}
                            text={String(number)}
                            fontSize="80px"
                            onClick={() => handleButtonClick(String(number))}
                        />
                    ))}
                </NumpadRowWrapper>
                <NumpadRowWrapper>
                    {[7, 8, 9].map((number) => (
                        <NumpadButton
                            key={number}
                            text={String(number)}
                            fontSize="80px"
                            onClick={() => handleButtonClick(String(number))}
                        />
                    ))}
                </NumpadRowWrapper>
                <NumpadRowWrapper>
                    <NumpadButton
                        text="취소"
                        fontSize="40px"
                        onClick={() => handleButtonClick("cancel")}
                    />
                    <NumpadButton text="0" fontSize="80px" onClick={() => handleButtonClick("0")} />
                    <NumpadButton
                        text="확인"
                        fontSize="40px"
                        onClick={() =>
                            updateUserInfo({ member: { id, name, phone, faceId, subId } })
                        }
                    />
                </NumpadRowWrapper>
            </NumpadBox>
        </NumpadContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default Numpad;
