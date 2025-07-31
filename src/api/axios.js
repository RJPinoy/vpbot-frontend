import axios from "axios";

const BASE_API_URL = 'http://localhost:8000/';

export const api = axios.create({
    baseURL: BASE_API_URL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
    withCredentials: true, // Include credentials (cookies) in requests
});

export const checkAuth = async () => {
    try {
        const response = await api.get('/api/me');
        return response.data;
    } catch (error) {
        console.error("Auth check failed:", error);
        return null;
    }
};

export const login = async (email, password, rememberMe) => {
    try {
        const response = await api.post('/api/login', { email, password, rememberMe });
        console.log("Login successful:", response.data);
        return response.data;
    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
}

export const logout = async () => {
    try {
        const response = await api.post('/api/logout');
        console.log("Logout successful:", response.data);
        return response.data;
    } catch (error) {
        console.error("Logout failed:", error);
        throw error;
    }
}