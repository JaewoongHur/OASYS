/* Import */
import { ApiProps } from "@customTypes/apiTypes";
import { UserState } from "@customTypes/storeTypes";
import instance from "@api/instance";
import processApiResponse from "@utils/api";
import { AxiosResponse } from "axios";

// ----------------------------------------------------------------------------------------------------

/* Post Face */
const postFace = async <T = UserState,>(props: ApiProps): Promise<T> => {
    const { responseFunc, data } = props;
    try {
        const response = await instance.post<T, AxiosResponse<T>>("/face/recognition", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        processApiResponse({ responseFunc, response });
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to postFace");
    }
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default postFace;
