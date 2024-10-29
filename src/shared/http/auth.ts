import axios from "axios";

const httpClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

httpClient.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("AUTH_TOKEN");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export { httpClient };
