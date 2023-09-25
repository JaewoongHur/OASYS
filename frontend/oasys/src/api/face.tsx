/* Import */
import { ApiProps } from "@customTypes/apiTypes";
import { UserState } from "@customTypes/storeTypes";
import instance from "@api/instance";
import processApiResponse from "@utils/api";
import { AxiosResponse } from "axios";

// ----------------------------------------------------------------------------------------------------

/* Face Recognition with HTTP Post Method */
const postFace = async <T = UserState,>(props: ApiProps): Promise<T> => {
    const { responseFunc, data } = props;
    try {
        const response = await instance.post<T, AxiosResponse<T>>(
            "/face/recognition",
            data.multipartFile,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            },
        );
        processApiResponse({ responseFunc, response });
        return response.data;
    } catch (error) {
        throw new Error("Failed to postFace");
    }
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default postFace;
