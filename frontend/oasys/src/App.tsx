import BoxButton from "@components/common/button/BoxButton";
import TextButton from "@components/common/button/TextButton";
import Bankbook from "@assets/icons/bankbook-icon.svg";
import TextInput from "@components/common/input/TextInput";
import { useState, ChangeEvent, FormEvent } from "react";

function App() {
    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        console.log(name);
    };
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!name.trim()) {
            setError(true);
        } else {
            setError(false);
        }
    };

    return (
        <>
            <div>
                <BoxButton
                    width="30%"
                    height="100%"
                    text="통장 · 계좌"
                    subText="통장 및 적금, 청약 신규, 자동이체, \n각종 변경, 분실 신고 등"
                    iconSrc={Bankbook}
                />
                <TextButton width="100px" text="확인" onClick={() => {}} />
            </div>

            <div>
                <form onSubmit={handleSubmit}>
                    <TextInput
                        width="50%"
                        height="100%"
                        borderRadius="10px"
                        type="text"
                        placeholder="텍스트를 입력하세요"
                        name="name"
                        label=""
                        value={name}
                        error={error}
                        onChange={handleNameChange}
                        disabled={false}
                    />
                    <TextButton type="submit" width="100px" text="등록" onClick={() => {}} />
                </form>
            </div>
        </>
    );
}

export default App;
