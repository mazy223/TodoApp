import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://localhost:7028/api",
    withCredentials: true
});


export default axiosInstance;