/* Import */
import { ProcessApiProps } from "@customTypes/apiTypes";

// ----------------------------------------------------------------------------------------------------

/* API Response Process Function */
async function processApiResponse({ responseFunc, response }: ProcessApiProps) {
    // Check for No Data in Response
    if (!response || !("data" in response)) {
        return;
    }

    const { data, status } = response;

    // Execute Response Function According to Status Code
    Object.entries(responseFunc).forEach(([statusCode, func]) => {
        const statusCodeNum: number = +statusCode;

        if (statusCodeNum === data.statusCode || statusCodeNum === status) {
            func(response);
        }
    });
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default processApiResponse;
