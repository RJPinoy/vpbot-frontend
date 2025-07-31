import { api } from "../axios";

export const listUsers = async (limit = null, offset = null, order = null) => {
    try {
        const params = {};

        if (limit !== null) params.limit = limit;
        if (offset !== null) params.offset = offset;
        if (order !== null) params.order = order;

        const response = await api.get('/api/users', { params });

        return response.data;
    } catch (error) {
        console.error("Fetch users failed:", error);
        return null;
    }
}

export const deleteUser = async (user_id) => {
    try {
        const response = await api.delete(`/api/users/${user_id}`)
        return response.data;
    } catch (error) {
        console.error("Deleting user failed:", error);
        return null;
    }
}