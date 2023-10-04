/* Import */
import { ApiProps, QuestionDataType } from "@customTypes/apiTypes";
import { AxiosResponse } from "axios";
import instance from "@api/instance";
import processApiResponse from "@utils/api";

// ----------------------------------------------------------------------------------------------------

/* Text-to-speech Question Request with HTTP Post Method */
const postQuestion = async <T = QuestionDataType>(props: ApiProps): Promise<T> => {
    const { responseFunc, data } = props;
    try {
        const response = await instance.post<T, AxiosResponse<T>>("/voice/question", data);
        processApiResponse({ responseFunc, response });
        return response.data;
    } catch (error) {
        throw new Error("Failed to postQuestion");
    }
};

/* Text-to-speech Confirm Request with HTTP Post Method */
const postConfirm = async <T = QuestionDataType>(props: ApiProps): Promise<T> => {
    const { responseFunc, data } = props;
    try {
        const response = await instance.post<T, AxiosResponse<T>>("/voice/confirm", data);
        processApiResponse({ responseFunc, response });
        return response.data;
    } catch (error) {
        throw new Error("Failed to postConfirm");
    }
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export { postQuestion, postConfirm };
