import { api } from "../../axios";

export const messages = async (action, params) => {
    try {
        const response = await api.post(`/api/messages/${action}`, params);
        console.log(action, " messages request successful: ", response.data);
        return response.data;
    } catch (error) {
        console.error(action, " messages request failed: ", error);
        throw error;
    }
}

export const pollRun = async (threadId, runId, type) => {
    try {
        const response = await api.post('/api/run', { threadId, runId, type });
        console.log("Poll successful:", response.data);
        return response.data;
    } catch (error) {
        console.error("Poll failed:", error);
        throw error;
    }
}