import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from './slices/userSlice'
import { publicChatbotSlice } from './slices/publicChatbotSlice'

export default configureStore({
    reducer: {
        userSlice: userSlice.reducer,
        publicChatbotSlice: publicChatbotSlice.reducer,
    },
})