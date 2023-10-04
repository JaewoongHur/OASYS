/* Import */
import Footer from "@components/common/footer";
import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { useSpeechRecognition } from "react-speech-kit";
import useUserStore from "@/store";
import postMessage from "@api/notification";
import { postQuestion, postConfirm } from "@api/voice";
import { AttendantAnimation, WaveAnimation } from "@components/common/animation";
import { TextArea } from "@components/common/input";
import useRouter from "@hooks/useRouter";

// ----------------------------------------------------------------------------------------------------

/* Style */
const SeniorContainer = styled("div")`
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

const SeniorBodyContainer = styled("div")`
    // Position Attribute
    display: flex;
    justify-content: left;
    align-items: center;

    // Size Attribute
    width: 100%;
`;

const PushButton = styled("button")`
    padding: 30px 60px;
    margin-top: 20px;
    cursor: pointer;
    background-color: transparent;
    color: black;
    border: none;
    border-radius: 5px;
    transition: background-color 0.3s ease;
    font-size: 50px;
    font-weight: bold;
    z-index: 2;

    &:hover {
        background-color: transparent;
    }
`;

// ----------------------------------------------------------------------------------------------------

/* Senior Page */
function Senior() {
    const [value, setValue] = useState<string>("");
    const [confirm, setConfirm] = useState<boolean>(false);
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [lastSpeechTime, setLastSpeechTime] = useState<number | null>(null);
    const gender = useUserStore((state) => state.gender);
    const { routeTo } = useRouter();

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
        async function askBusiness(text: string) {
            await postQuestion({
                responseFunc: {
                    200: (response) => {
                        const receivedText = response?.data;
                        setValue(receivedText);
                        setConfirm(true);
                        // toggleRecording();
                    },
                    400: () => {},
                },
                data: {
                    text,
                    gender,
                },
            });
        }

        async function confirmBusiness(text: string) {
            await postConfirm({
                responseFunc: {
                    200: (response) => {
                        const receivedText = response?.data;
                        setValue(receivedText);
                        if (response?.data) {
                            sendTextMessage();
                        } else {
                            setConfirm(false);
                            // routeTo("/senior");
                            // toggleRecording();
                        }
                    },
                    400: () => {},
                },
                data: {
                    text,
                    gender,
                },
            });
        }

        if (isRecording && lastSpeechTime) {
            const checkSilenceInterval = setInterval(() => {
                if (Date.now() - lastSpeechTime > 3000) {
                    stop();
                    setIsRecording(false);
                    if (confirm) {
                        confirmBusiness(value);
                    } else {
                        askBusiness(value);
                    }
                    setLastSpeechTime(null);
                }
            }, 1000);

            return () => clearInterval(checkSilenceInterval);
        }
        return () => {};
    }, [confirm, isRecording, lastSpeechTime, stop, value, gender, routeTo]);

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
                <PushButton type="button" onClick={toggleRecording}>
                    {isRecording ? "음성 인식 중입니다 🎧" : "말하기 💬"}
                </PushButton>
            </SeniorBodyContainer>
            <WaveAnimation />
            <Footer isRecording={isRecording} />
        </SeniorContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default Senior;
