/* Import */
import { ApiProps } from "@customTypes/apiTypes";
import { AxiosResponse } from "axios";
import instance from "@api/instance";
import { NoticeState } from "@customTypes/storeTypes";
import processApiResponse from "@utils/api";

// ----------------------------------------------------------------------------------------------------

/* Text Message Transmission with HTTP Post Method */
const postMessage = async <T = NoticeState>(props: ApiProps): Promise<T> => {
    const { responseFunc, data } = props;
    try {
        const response = await instance.post<T, AxiosResponse<T>>("/notification/message", data);
        processApiResponse({ responseFunc, response });
        return response.data;
    } catch (error) {
        throw new Error("Failed to postMessage");
    }
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default postMessage;
