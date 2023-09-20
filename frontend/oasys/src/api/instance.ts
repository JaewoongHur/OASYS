/* Import */
import axios, { AxiosInstance } from "axios";

// ----------------------------------------------------------------------------------------------------

/* Server URL for Instance */
const { VITE_SERVER_URL } = import.meta.env;

/* Axios Instance */
const instance: AxiosInstance = axios.create({
    baseURL: VITE_SERVER_URL,
    timeout: 10000,
    headers: {
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": `http://localhost:5173`,
        "Content-Type": "application/json; charset=UTF-8",
    },
});

// ----------------------------------------------------------------------------------------------------

/* Export */
export default instance;
