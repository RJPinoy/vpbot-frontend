import { createSlice } from '@reduxjs/toolkit'

export const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        user: {
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            img: '',
        },
        isAuthenticated: false,
        isLoading: false,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setUserImage: (state, action) => {
            state.user.img = action.payload;
        },
        setIsAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});

export const { setUser, setUserImage, setIsAuthenticated, setIsLoading } = adminSlice.actions;
export default adminSlice.reducer;