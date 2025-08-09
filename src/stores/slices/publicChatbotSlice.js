import { createSlice } from '@reduxjs/toolkit'

export const publicChatbotSlice = createSlice({
    name: 'publicChatbot',
    initialState: {
            apiKey: 'sk-...',
            assistantId: 'asst-...',
            model: 'gpt-4o-mini',
            name: 'VPilot',
            iconUrl: '/assets/images/chatbot/chatbot.gif',
            fontColor1: '#ffffff',
            fontColor2: '#ffffff',
            mainColor: '#306285',
            secondaryColor: '#616161',
            renderEveryPages: true,
            position: 'right',
            welcomeMessage: 'Bonjour ! Comment puis-je vous aider sur la documentation de Visual Planning ?',
            promptMessage: 'Posez-moi vos questions !',
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