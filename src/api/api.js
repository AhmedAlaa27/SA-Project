import axios from "axios";

const api = axios.create({
    baseURL: "https://inventory-api-oa4l.onrender.com/",
    withCredentials: true
});

export default api;