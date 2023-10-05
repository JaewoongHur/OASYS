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

/* Make Phone Number Format */
function formatPhoneNumber(phoneNumber: string): string {
    if (phoneNumber.length <= 3) {
        return phoneNumber;
    }
    if (phoneNumber.length <= 7) {
        return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
    }
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`;
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export { lineBreakText, formatPhoneNumber };
