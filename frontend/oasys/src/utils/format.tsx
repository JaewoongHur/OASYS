/* Import */
import React from "react";

// ----------------------------------------------------------------------------------------------------

/* Line Break Text by '\n' */
function lineBreakText(text: string) {
    return text.split("\n").map((line) => (
        <React.Fragment key={line}>
            {line}
            <br />
        </React.Fragment>
    ));
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default lineBreakText;
