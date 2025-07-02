import { configureStore } from '@reduxjs/toolkit'
import { adminSlice } from './slices/adminSlice'

export default configureStore({
    reducer: {
        admin: adminSlice.reducer,
    },
})