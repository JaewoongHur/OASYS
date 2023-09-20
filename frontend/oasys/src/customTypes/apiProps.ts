/* Import */
import { AxiosResponse } from "axios";

// ----------------------------------------------------------------------------------------------------

/* Export */
export type ResponseFuncType = {
    [statusCode: number]: (response?: AxiosResponse) => void;
};

export interface ProcessApiProps {
    responseFunc: ResponseFuncType;
    response: AxiosResponse;
}
