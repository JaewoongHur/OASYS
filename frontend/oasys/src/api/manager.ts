/* Import */
import { ApiProps } from "@customTypes/apiTypes";
import { AxiosResponse } from "axios";
import instance from "@api/instance";
import processApiResponse from "@utils/api";
import { UserState } from "@customTypes/storeTypes";

// ----------------------------------------------------------------------------------------------------

/* Manager health-check with HTTP Get Method */
const getHealthCheck = async <T = UserState>(props: ApiProps): Promise<T> => {
    const { responseFunc } = props;
    try {
        const response = await instance.get<T, AxiosResponse<T>>("/manager/health-check");
        processApiResponse({ responseFunc, response });
        return response.data;
    } catch (error) {
        throw new Error("Failed to healthCheck");
    }
};

/* Manager Redis Flush All with HTTP Get Method */
const getRedisFlushAll = async <T = UserState>(props: ApiProps): Promise<T> => {
    const { responseFunc } = props;
    try {
        const response = await instance.get<T, AxiosResponse<T>>(
            "/manager/health-check/redisFlushAll",
        );
        processApiResponse({ responseFunc, response });
        return response.data;
    } catch (error) {
        throw new Error("Failed to flushAll");
    }
};

/* Manager Teller List with HTTP Get Method */
const getList = async <T = UserState>(props: ApiProps): Promise<T> => {
    const { responseFunc } = props;
    try {
        const response = await instance.get<T, AxiosResponse<T>>("/manager/teller/list");
        processApiResponse({ responseFunc, response });
        return response.data;
    } catch (error) {
        throw new Error("Failed to getList");
    }
};

/* Manager Add Consumer with HTTP Post Method */
const postWaiting = async <T = UserState>(props: ApiProps): Promise<T> => {
    const { responseFunc, data } = props;
    try {
        const response = await instance.post<T, AxiosResponse<T>>(
            "/manager/consumer/waiting",
            data,
        );
        processApiResponse({ responseFunc, response });
        return response.data;
    } catch (error) {
        throw new Error("Failed to getWaiting");
    }
};

/* Manager Get Member Info with HTTP Post Method */
const getConsumer = async <T = UserState>(props: ApiProps): Promise<T> => {
    const { responseFunc } = props;
    try {
        const response = await instance.get<T, AxiosResponse<T>>(
            "/manager/consumer/", // userName..?
        );
        processApiResponse({ responseFunc, response });
        return response.data;
    } catch (error) {
        throw new Error("Failed to getConsumer");
    }
};

/* Manager Put Waiting People with HTTP Put Method */
const putConsumer = async <T = UserState>(props: ApiProps): Promise<T> => {
    const { responseFunc } = props;
    try {
        const response = await instance.put<T, AxiosResponse<T>>(
            "manager/consulting/", // userName..?
        );
        processApiResponse({ responseFunc, response });
        return response.data;
    } catch (error) {
        throw new Error("Failed to putConsumer");
    }
};

/* Manager Delete Consumer with HTTP Post Method */
const deleteConsumer = async <T = UserState>(props: ApiProps): Promise<T> => {
    const { responseFunc } = props;
    try {
        const response = await instance.delete<T, AxiosResponse<T>>(
            "manager/consulting/", // userId..?
        );
        processApiResponse({ responseFunc, response });
        return response.data;
    } catch (error) {
        throw new Error("Failed to deleteConsumer");
    }
};

/* Manager Join Consumer with HTTP Post Method */
const postMember = async <T = UserState>(props: ApiProps): Promise<T> => {
    const { responseFunc, data } = props;
    try {
        const response = await instance.post<T, AxiosResponse<T>>("manager/member", data);
        processApiResponse({ responseFunc, response });
        return response.data;
    } catch (error) {
        throw new Error("Failed to postMember");
    }
};
// ----------------------------------------------------------------------------------------------------

/* Export */
export {
    getHealthCheck,
    getRedisFlushAll,
    getList,
    postWaiting,
    getConsumer,
    putConsumer,
    deleteConsumer,
    postMember,
};
