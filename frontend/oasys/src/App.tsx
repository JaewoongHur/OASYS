import BoxButton from "@components/common/button/BoxButton";
import TextButton from "@components/common/button/TextButton";
import Bankbook from "@assets/icons/bankbook-icon.svg";
import TextInput from "@components/common/input/TextInput";
import TextArea from "@components/common/input/TextArea";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";

function App() {
    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    // const [text, setText] = useState("");

    const text = "여기에 TTS 텍스트가 들어갑니다.";

    const resize = () => {
        const textarea = document.getElementById("target-textarea") as HTMLTextAreaElement | null;
        if (textarea) {
            textarea.style.height = "0px";
            const { scrollHeight } = textarea;
            const style = window.getComputedStyle(textarea);
            const borderTop = parseInt(style.borderTop || "0", 10);
            const borderBottom = parseInt(style.borderBottom || "0", 10);
            textarea.style.height = `${scrollHeight + borderTop + borderBottom}px`;
        }
    };

    useEffect(() => {
        resize();
    }, [text]);

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

            <br />

            <div>
                <form onSubmit={handleSubmit}>
                    <TextInput
                        width="50%"
                        height="100%"
                        borderRadius="8px"
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

            <br />
            <div>
                <TextArea
                    id="target-textarea"
                    width="500px"
                    height="100%"
                    type="text"
                    error={error}
                    value={text}
                    disabled
                />
            </div>
        </>
    );
}

export default App;
