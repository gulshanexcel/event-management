import axios from 'axios';

// Create an Axios instance with default settings
export const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
});

// Request interceptor to add Authorization header if token is present in localStorage
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Global error handler, check if status code is 401 then redirect to login page and clear token
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/auth/signin';
        }
        return Promise.reject(error);
    }
)