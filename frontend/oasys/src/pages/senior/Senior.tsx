/* Import */
import Footer from "@components/common/footer";
import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { useSpeechRecognition } from "react-speech-kit";
import { useUserStore } from "@/store";
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

// ----------------------------------------------------------------------------------------------------

/* Senior Page */
function Senior() {
    const [value, setValue] = useState<string>("");
    const [confirm, setConfirm] = useState<boolean>(false);
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [lastSpeechTime, setLastSpeechTime] = useState<number | null>(null);
    const gender = useUserStore((state) => state.gender);
    const name = useUserStore((state) => state.member.name);
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

    // 고객 응대 기능 추가
    useEffect(() => {
        let welcomeAudioWoman;
        let welcomeAudioMan;
        let waitTime;

        if (name === null) {
            welcomeAudioWoman = new Audio("../src/assets/sounds/업무_응대_확인_여자.mp3");
            welcomeAudioMan = new Audio("../src/assets/sounds/업무_응대_확인_남자.mp3");
            waitTime = 4500;
            if (gender === "FEMALE") {
                welcomeAudioMan.play();
            } else {
                welcomeAudioWoman.play();
            }
        } else {
            welcomeAudioWoman = new Audio("../src/assets/sounds/회원_응대_확인_여자.mp3");
            welcomeAudioMan = new Audio("../src/assets/sounds/회원_응대_확인_남자.mp3");
            waitTime = 7000;
            if (gender === "FEMALE") {
                welcomeAudioMan.play();
            } else {
                welcomeAudioWoman.play();
            }
        }

        // 일정 시간 동안 대기 후 고객 음성 인식
        setTimeout(() => {
            listen();
            setIsRecording(true);
        }, waitTime);

        // unmount시 음성 재생 취소
        return () => {
            welcomeAudioWoman.pause();
            welcomeAudioMan.pause();
            welcomeAudioWoman.currentTime = 0;
            welcomeAudioMan.currentTime = 0;
        };
    }, []); // 최초로 한번만 실행

    useEffect(() => {
        async function askBusiness(text: string) {
            await postQuestion({
                responseFunc: {
                    200: (response) => {
                        const receivedText = response?.data;
                        setValue(receivedText);
                        setConfirm(true);

                        // 일정 시간 동안 대기 후 고객 음성 인식
                        setTimeout(() => {
                            listen();
                            setIsRecording(true);
                        }, 4000);
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

                            // 일정 시간 동안 대기 후 고객 음성 인식
                            setTimeout(() => {
                                listen();
                                setIsRecording(true);
                            }, 4000);
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

    return (
        <SeniorContainer>
            <SeniorBodyContainer>
                <AttendantAnimation isRecording={isRecording} userGender={gender} />
                <TextArea width="100%" value={value} />
            </SeniorBodyContainer>
            <WaveAnimation />
            <Footer isRecording={isRecording} />
        </SeniorContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default Senior;
