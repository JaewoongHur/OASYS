/* Import */
import { css } from "@emotion/react";

// ----------------------------------------------------------------------------------------------------

/* Global Style */
const globalStyles = css`
    @font-face {
        font-family: "Pretendard";
        font-weight: 100;
        src: url("src/assets/fonts/Pretendard-Thin.woff") format("woff");
    }

    @font-face {
        font-family: "Pretendard";
        font-weight: 200;
        src: url("src/assets/fonts/Pretendard-ExtraLight.woff") format("woff");
    }

    @font-face {
        font-family: "Pretendard";
        font-weight: 300;
        src: url("src/assets/fonts/Pretendard-Light.woff") format("woff");
    }

    @font-face {
        font-family: "Pretendard";
        font-weight: 400;
        font-style: normal;
        src: url("src/assets/fonts/Pretendard-Regular.woff") format("woff");
    }

    @font-face {
        font-family: "Pretendard";
        font-weight: 500;
        src: url("src/assets/fonts/Pretendard-Medium.woff") format("woff");
    }

    @font-face {
        font-family: "Pretendard";
        font-weight: 600;
        src: url("src/assets/fonts/Pretendard-SemiBold.woff") format("woff");
    }

    @font-face {
        font-family: "Pretendard";
        font-weight: 700;
        font-style: bold;
        src: url("src/assets/fonts/Pretendard-Bold.woff") format("woff");
    }

    @font-face {
        font-family: "Pretendard";
        font-weight: 800;
        src: url("src/assets/fonts/Pretendard-ExtraBold.woff") format("woff");
    }

    @font-face {
        font-family: "Pretendard";
        font-weight: 900;
        src: url("src/assets/fonts/Pretendard-Black.woff") format("woff");
    }

    @font-face {
        font-family: "Cafe24 Ssurround Air";
        src: url("src/assets/fonts/Cafe24-Ssurround-Air.woff") format("woff");
    }

    @font-face {
        font-family: "Cafe24 Ssurround";
        src: url("src/assets/fonts/Cafe24-Ssurround.woff") format("woff");
    }

    @font-face {
        font-family: "Gmarket Sans Light";
        src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansLight.woff")
            format("woff");
    }

    @font-face {
        font-family: "Gmarket Sans Medium";
        src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff")
            format("woff");
    }

    @font-face {
        font-family: "Gmarket Sans Bold";
        src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansBold.woff")
            format("woff");
    }

    @font-face {
        font-family: "Gangwon Edu Power";
        src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2201-2@1.0/GangwonEduPowerExtraBoldA.woff")
            format("woff");
    }

    * {
        font-family: "Pretendard", sans-serif;
        font-size: 16px;
    }

    ::-webkit-scrollbar-track {
        margin-top: 10px;
        border-radius: 10px;
        background-color: transparent;
    }

    ::-webkit-scrollbar {
        width: 10px;
        padding-right: 5px;
        background-color: transparent;
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background-clip: padding-box;
        background-color: hsla(0, 0%, 42%, 0.29);
        border: 3px solid transparent;
    }

    ::-webkit-scrollbar-corner {
        background-color: transparent;
    }

    html,
    body,
    div,
    span,
    applet,
    object,
    iframe,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    blockquote,
    pre,
    a,
    abbr,
    acronym,
    address,
    big,
    button,
    cite,
    code,
    del,
    dfn,
    em,
    img,
    ins,
    kbd,
    q,
    s,
    samp,
    small,
    strike,
    strong,
    sub,
    sup,
    tt,
    var,
    b,
    u,
    i,
    center,
    dl,
    dt,
    dd,
    ol,
    ul,
    li,
    fieldset,
    form,
    label,
    legend,
    table,
    caption,
    tbody,
    tfoot,
    thead,
    tr,
    th,
    td,
    article,
    aside,
    canvas,
    details,
    embed,
    figure,
    figcaption,
    footer,
    header,
    hgroup,
    menu,
    nav,
    output,
    ruby,
    section,
    summary,
    time,
    mark,
    audio,
    video {
        margin: 0;
        padding: 0;
        border: 0;
        vertical-align: baseline;
    }
`;

// ----------------------------------------------------------------------------------------------------

/* Export */
export default globalStyles;
