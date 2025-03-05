import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import habitsReducer from './features/habitsSlice';
import authReducer from './features/authSlice';

const authPersistConfig = {
    key: 'auth',
    storage,
};

const habitsPersistConfig = {
    key: 'habits',
    storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedHabitsReducer = persistReducer(habitsPersistConfig, habitsReducer);

export const store = configureStore({
    reducer: {
        habits: persistedHabitsReducer,
        auth: persistedAuthReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store); 