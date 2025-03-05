import { configureStore } from "@reduxjs/toolkit";
import habitsReducer from './features/habitsSlice';
import authReducer from './features/authSlice';

export const store = configureStore({
    reducer: {
        habits: habitsReducer,
        auth: authReducer,
    },
}); 