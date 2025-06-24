import axios from "axios";

const BASE_API_URL = 'http://localhost:8000/';

export const api = axios.create({
    baseURL: BASE_API_URL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
});