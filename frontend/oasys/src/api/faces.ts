/* Import */
import { ApiProps } from "@customTypes/apiTypes";
import { AxiosResponse } from "axios";
import instance from "@api/instance";
import processApiResponse from "@utils/api";
import { UserState } from "@customTypes/storeTypes";

// ----------------------------------------------------------------------------------------------------

/* Face Recognition with HTTP Post Method */
const postFaces = async <T = UserState>(props: ApiProps): Promise<T> => {
    const { responseFunc, data } = props;
    try {
        const response = await instance.post<T, AxiosResponse<T>>(
            "/faces/recognition",
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
export default postFaces;
