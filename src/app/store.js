import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';
import authReducer from '../features/auth/authSlice';
import searchReducer from '../features/search/searchSlice';
import { savePersist } from '../utils/persist';

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        search: searchReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: import.meta.env.DEV,
});

// Keep the "trust this device" choice in localStorage.
let lastPersist = store.getState().auth.persist;
store.subscribe(() => {
    const { persist } = store.getState().auth;
    if (persist !== lastPersist) {
        lastPersist = persist;
        savePersist(persist);
    }
});
