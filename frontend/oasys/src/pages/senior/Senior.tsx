/* Import */
import axios from "axios";
import { useState, useEffect } from "react";
import { useSpeechRecognition } from "react-speech-kit";
import "./SeniorTalk.css";
import styled from "@emotion/styled";
import Footer from "@components/common/footer";
import useUserStore from "@/store";
import postMessage from "@api/notification";
import { AttendantAnimation, WaveAnimation } from "@components/common/animation";
import { TextArea } from "@components/common/input";

// ----------------------------------------------------------------------------------------------------

/* Style */
const SeniorContainer = styled("div")`
    position: relative;
    height: 100vh;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    background-color: ${(props) => props.theme.colors.gray1};
    user-select: none;
`;

const SeniorBodyContainer = styled("div")`
    display: flex;
    justify-content: left;
    width: 100%;
`;

// ----------------------------------------------------------------------------------------------------

/* Senior Page */
function Senior() {
    const [value, setValue] = useState<string>("");
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [lastSpeechTime, setLastSpeechTime] = useState<number | null>(null);
    const gender = useUserStore((state) => state.gender);

    async function sendTextMessage() {
        await postMessage({
            responseFunc: {
                200: () => {},
                400: () => {},
            },
            data: {
                name: "",
                phone: "",
                teller: 2,
                waitPeople: 3,
                work: "",
            },
        });
    }

    const { listen, stop } = useSpeechRecognition({
        onResult: (result) => {
            setValue(result);
            setLastSpeechTime(Date.now());
        },
    });

    useEffect(() => {
        const sendToBackend = async (text: string) => {
            try {
                const response = await axios.post<string>(
                    "http://localhost:8081/api/v1/voice/tts",
                    { text },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    },
                );
                const receivedText = response.data;

                setValue(receivedText);
                sendTextMessage();
                // textToSpeech(receivedText);
            } catch (error) {
                console.error("Error sending voice text to backend:", error);
            }
        };

        if (isRecording && lastSpeechTime) {
            const checkSilenceInterval = setInterval(() => {
                if (Date.now() - lastSpeechTime > 3000) {
                    stop();
                    setIsRecording(false);
                    sendToBackend(value);
                    setLastSpeechTime(null); // Reset the last speech time when silence is detected
                }
            }, 1000);

            return () => clearInterval(checkSilenceInterval);
        }
        return () => {};
    }, [isRecording, lastSpeechTime, stop, value]);

    const toggleRecording = () => {
        if (isRecording) {
            stop();
            setIsRecording(false);
            setLastSpeechTime(null); // Reset the last speech time when stopping
        } else {
            listen();
            setIsRecording(true);
        }
    };

    return (
        <SeniorContainer>
            <SeniorBodyContainer>
                <AttendantAnimation isRecording={isRecording} userGender={gender} />
                <TextArea width="100%" value={value} />
                <button type="button" className="btnRecord" onClick={toggleRecording}>
                    {isRecording ? "음성 인식 중입니다 🎧" : "말하기 💬"}
                </button>
            </SeniorBodyContainer>
            <WaveAnimation />
            <Footer isRecording={isRecording} />
        </SeniorContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default Senior;
