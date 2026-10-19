import { createSlice } from '@reduxjs/toolkit';
import { loadPersist } from '../../utils/persist';

const authSlice = createSlice({
    name: 'auth',
    initialState: { username: null, token: null, persist: loadPersist() },
    reducers: {
        setCredentials: (state, action) => {
            const { username, token } = action.payload;
            state.token = token;
            if (username) state.username = username;
        },
        logOut: (state) => {
            state.username = null;
            state.token = null;
        },
        setPersist: (state, action) => {
            state.persist = Boolean(action.payload);
        },
    },
});

export const { setCredentials, logOut, setPersist } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.username;
export const selectCurrentToken = (state) => state.auth.token;
export const selectPersist = (state) => state.auth.persist;
