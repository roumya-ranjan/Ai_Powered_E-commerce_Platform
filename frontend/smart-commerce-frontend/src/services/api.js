import axios from "axios";

const api = axios.create({
    baseURL: "https://ai-powered-e-commerce-platform-api.onrender.com/api/products",
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;