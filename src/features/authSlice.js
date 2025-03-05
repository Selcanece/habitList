import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    isAuthenticated: false,
    error: null
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.error = null;
        },
        loginFailed: (state, action) => {
            state.user = null;
            state.isAuthenticated = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
        }
    }
});

export const { loginSuccess, loginFailed, logout } = authSlice.actions;
export default authSlice.reducer; 