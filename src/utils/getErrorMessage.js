const DEFAULT_MESSAGE = 'Something went wrong. Please try again.';

// Turns an RTK Query error into something safe to show a user.
export const getErrorMessage = (error, fallback = DEFAULT_MESSAGE) => {
    if (!error) return fallback;
    if (error.status === 'FETCH_ERROR') {
        return 'Could not reach the server. Check your connection and try again.';
    }
    if (typeof error.data?.message === 'string') return error.data.message;
    return fallback;
};
