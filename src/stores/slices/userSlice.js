import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            img: '',
            roles: [],
        },
        rememberMe: false,
        isAuthenticated: false,
        isLoading: false,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        setUserImage: (state, action) => {
            state.user.img = action.payload;
        },
        setRememberMe: (state, action) => {
            state.rememberMe = action.payload;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        }
    },
});

export const { setUser, setUserImage, setRememberMe, setIsLoading } = userSlice.actions;
export default userSlice.reducer;