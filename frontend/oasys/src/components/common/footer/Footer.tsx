/* Import */
import styled from "@emotion/styled";

// ----------------------------------------------------------------------------------------------------
/* Props Type */

type FooterProps = {
    backgroundColor: string;
    text?: string;
    onClick?: () => void;
};
// ----------------------------------------------------------------------------------------------------
/* Style */
const FooterDiv = styled("div")<FooterProps>`
    position: fixed;
    width: 100vw;
    height: 100px;
    bottom: 0px;
    background-color: ${(props) => props.backgroundColor};
    color: #fff;
    text-align: center;
    line-height: 100px;
    font-size: 40px;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    z-index: 10;
`;

// ----------------------------------------------------------------------------------------------------

/* Footer Component */
function Footer(props: FooterProps) {
    const { backgroundColor, text, onClick } = props;
    return (
        <FooterDiv backgroundColor={backgroundColor} onClick={onClick}>
            {text}
        </FooterDiv>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default Footer;
