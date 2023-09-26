/* Import */
import styled from "@emotion/styled";

// ----------------------------------------------------------------------------------------------------
/* Props Type */

type OverlayProps = {
    onClick: (e: React.MouseEvent) => void;
};
// ----------------------------------------------------------------------------------------------------
/* Style */
const OverlayDiv = styled("div")<OverlayProps>`
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0px;
    background-color: rgba(0, 0, 0, 0.75);
    color: #fff;
    text-align: center;
    z-index: 9999;
`;

// ----------------------------------------------------------------------------------------------------

/* Overlay Component */
function Overlay(props: OverlayProps) {
    const { onClick } = props;

    return <OverlayDiv onClick={onClick} />;
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default Overlay;
