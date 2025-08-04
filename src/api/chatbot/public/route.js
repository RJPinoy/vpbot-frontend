import { api } from "../../axios";

export const getPublicChatbot = async () => {
    try {
        const response = await api.get(`/api/public_chatbot`);
        return response.data;
    } catch (error) {
        console.error("Failed fetching public chatbot:", error);
        return null;
    }
}

export const modifyPublicChatbot = async (params) => {
    try {
        const response = await api.put(`/api/public_chatbot`, params );
        return response.data;
    } catch (error) {
        console.error("Modifying public chatbot failed:", error);
        return null;
    }
}