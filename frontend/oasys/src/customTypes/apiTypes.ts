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

export interface ApiProps {
    responseFunc: ResponseFuncType;
    data: { [key: string]: string };
    routeTo?: (path: string) => void;
}
