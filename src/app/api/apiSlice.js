import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logOut, setCredentials } from '../../features/auth/authSlice';

export const BASE_URL = import.meta.env.VITE_API_URL || 'https://moviedb-backend-tz9d.onrender.com';

// Endpoints that must never trigger a token refresh themselves.
const AUTH_ENDPOINTS = ['login', 'register', 'refresh', 'sendLogout'];

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

// Shared so parallel requests that all get 401/403 wait on a single /refresh call.
let refreshPromise = null;

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    const status = result.error?.status;

    if ((status === 401 || status === 403) && !AUTH_ENDPOINTS.includes(api.endpoint)) {
        if (!refreshPromise) {
            refreshPromise = baseQuery('/refresh', api, extraOptions).finally(() => {
                refreshPromise = null;
            });
        }
        const refreshResult = await refreshPromise;

        if (refreshResult.data) {
            api.dispatch(setCredentials(refreshResult.data));
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logOut());
        }
    }
    return result;
};

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Movies', 'Favorites', 'User'],
    endpoints: () => ({}),
});
