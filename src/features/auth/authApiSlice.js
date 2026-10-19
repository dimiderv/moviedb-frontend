import { apiSlice } from '../../app/api/apiSlice';
import { setCredentials } from './authSlice';

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        register: builder.mutation({
            query: (user) => ({
                url: '/register',
                method: 'POST',
                body: user,
            }),
        }),
        refresh: builder.mutation({
            query: () => ({
                url: '/refresh',
                method: 'GET',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setCredentials(data));
                } catch {
                    // No valid refresh cookie: the user simply stays logged out.
                }
            },
        }),
        sendLogout: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'POST',
            }),
        }),
        getUserData: builder.query({
            query: () => '/user',
            providesTags: ['User'],
        }),
        updateUserDetails: builder.mutation({
            query: (dataObj) => ({
                url: '/user',
                method: 'PATCH',
                body: { dataObj },
            }),
            invalidatesTags: ['User'],
        }),
        updatePassword: builder.mutation({
            query: (dataObj) => ({
                url: '/user',
                method: 'PUT',
                body: { dataObj },
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useRefreshMutation,
    useSendLogoutMutation,
    useGetUserDataQuery,
    useUpdateUserDetailsMutation,
    useUpdatePasswordMutation,
} = authApiSlice;
