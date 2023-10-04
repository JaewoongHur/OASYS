/* Import */
import { AnimationProps } from "@customTypes/componentTypes";
import styled from "@emotion/styled";
import { ListeningMan, ListeningWoman, TalkingMan, TalkingWoman } from "@assets/images";

// ----------------------------------------------------------------------------------------------------

/* Style */
const AttendantContainer = styled("div")`
    // Position Attribute
    z-index: 10;

    // Size Attribute
    height: 100vh;
`;

const AttendantWrapper = styled("img")`
    // Size Attribute
    height: 100vh;
`;

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
