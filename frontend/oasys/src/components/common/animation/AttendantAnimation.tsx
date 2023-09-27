/* Import */
import { AnimationProps } from "@customTypes/componentTypes";
import styled from "@emotion/styled";
import { ListeningMan, ListeningWoman, TalkingMan, TalkingWoman } from "@assets/images";

// ----------------------------------------------------------------------------------------------------

/* Style */
const AttendantContainer = styled("div")`
    z-index: 1;
    height: 100%;
`;

const AttendantWrapper = styled("img")``;

// ----------------------------------------------------------------------------------------------------

/* Attendant Animation Component */
function AttendantAnimation(props: AnimationProps) {
    const { isRecording, userGender } = props;

    // Find Image Source for AI Attendant
    function findImageSource(isListening: boolean, gender: "MALE" | "FEMALE" | undefined): string {
        if (gender === "FEMALE") {
            return isListening ? ListeningMan : TalkingMan;
        }
        return isListening ? ListeningWoman : TalkingWoman;
    }

    return (
        <AttendantContainer>
            <AttendantWrapper src={findImageSource(isRecording, userGender)} alt="AI-Attendant" />
        </AttendantContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default AttendantAnimation;
