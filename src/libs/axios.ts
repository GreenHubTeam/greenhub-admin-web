import axios from "axios";
import { getCookie, deleteCookie } from 'cookies-next';

export const api = axios.create({
    baseURL: process.env.BASE_API_URL
});

api.interceptors.request.use(
    (config) => {
        if (typeof window !== 'undefined') {
            const token = getCookie('jwt');
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const setupAxiosInterceptors = (logout: () => void) => {
    api.interceptors.response.use(
        response => response,
        error => {
            if (error.response && error.response.status === 401) {
                logout();
                deleteCookie('jwt');
            }
            return Promise.reject(error);
        }
    );
};