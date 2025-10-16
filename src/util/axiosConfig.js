import axios from "axios";
import {BASE_URL} from "./apiEndpoints.js";

const axiosConfig = axios.create({
    baseURL: `${BASE_URL}/api`,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    }
})

export default axiosConfig;