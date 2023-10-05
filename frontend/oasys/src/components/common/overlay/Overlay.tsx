/* Import */
import styled from "@emotion/styled";
import { OverlayProps } from "@customTypes/componentTypes";

// ----------------------------------------------------------------------------------------------------

/* Style */
const OverlayBox = styled("div")`
    // Position Attribute
    position: fixed;
    top: 0;
    z-index: 9999;

    // Size Attribute
    width: 100vw;
    height: 100vh;

    // Style Attritube
    background-color: rgba(0, 0, 0, 0.75);
`;

// ----------------------------------------------------------------------------------------------------

/* Overlay Component */
function Overlay(props: OverlayProps) {
    const { onClick } = props;

    return <OverlayBox onClick={onClick} />;
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default Overlay;
