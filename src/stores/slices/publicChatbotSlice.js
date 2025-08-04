import { createSlice } from '@reduxjs/toolkit'

export const publicChatbotSlice = createSlice({
    name: 'publicChatbot',
    initialState: {
            apiKey: '',
            assistantId: '',
            model: '',
            name: '',
            iconUrl: '',
            fontColor1: '#000000',
            fontColor2: '#000000',
            mainColor: '#000000',
            secondaryColor: '#000000',
            renderEveryPages: '',
            position: '',
            welcomeMessage: '',
            promptMessage: '',
            showDesktop: true,
            showTablet: true,
            showMobile: true,
    },
    reducers: {
        setPublicChatbot: (state, action) => {
            Object.assign(state, action.payload);
        },
    },
});

export const { setPublicChatbot } = publicChatbotSlice.actions;
export default publicChatbotSlice.reducer;