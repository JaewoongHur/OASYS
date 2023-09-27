/* Import */
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { Wave } from "@assets/icons";

// ----------------------------------------------------------------------------------------------------

/* Style */
const waveKeyframes = keyframes`
    0% {
        // Size Attribute
        margin-left: 0;
    }
    100% {
        // Size Attribute
        margin-left: -1600px;
    }
`;

const swellKeyframes = keyframes`
    0%, 100% {
        // Interaction Attribute
        transform: translate3d(0, -25px, 0);
    }
    50% {
        // Interaction Attribute
        transform: translate3d(0, 5px, 0);
    }
`;

const OceanContainer = styled("div")`
    // Position Attribute
    position: absolute;
    left: 0;
    bottom: 0;

    // Size Attribute
    width: 100%;
    height: 25%;

    // Style Attribute
    background-color: ${(props) => props.theme.colors.primary0};
`;

const WaveWrapper = styled("div")`
    // Position Attribute
    position: absolute;
    top: -10em;

    // Size Attribute
    width: 6400px;
    height: 100%;

    // Style Attribute
    background: url(${Wave}) repeat-x;

    // Interaction Attribute
    animation: ${waveKeyframes} 20s cubic-bezier(0.35, 0.45, 0.65, 0.55) infinite;
    transform: translate3d(0, 0, 0);

    // Second Wave Animation Attribute
    &:nth-of-type(2) {
        top: -8em;
        opacity: 1;
        animation:
            ${waveKeyframes} 15s cubic-bezier(0.45, 0.35, 0.55, 0.35) -1s infinite,
            ${swellKeyframes} 15s ease -1s infinite;
    }

    // Third Wave Animation Attribute
    &:nth-of-type(3) {
        top: -5em;
        opacity: 1;
        animation:
            ${waveKeyframes} 10s cubic-bezier(0.35, 0.5, 0.6, 0.55) -2s infinite,
            ${swellKeyframes} 10s ease -2s infinite;
    }
`;

// ----------------------------------------------------------------------------------------------------

/* Wave Animation Component */
function WaveAnimation() {
    return (
        <OceanContainer>
            <WaveWrapper />
            <WaveWrapper />
            <WaveWrapper />
        </OceanContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default WaveAnimation;
