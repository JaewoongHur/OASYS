/* Import */
import { AxiosResponse } from "axios";

// ----------------------------------------------------------------------------------------------------

/* Export */
export interface ResponseFuncType {
    [statusCode: number]: (response?: AxiosResponse) => void;
}

export interface ProcessApiProps {
    responseFunc: ResponseFuncType;
    response: AxiosResponse;
}

export interface QuestionDataType {
    text: string;
    gender: "MALE" | "FEMALE" | undefined;
}

export interface ApiProps {
    responseFunc: ResponseFuncType;
    data: { [key: string]: unknown };
    routeTo?: (path: string) => void;
}
