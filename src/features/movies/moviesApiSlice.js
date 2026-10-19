import { apiSlice } from '../../app/api/apiSlice';

export const moviesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Paginated: returns { movies, page, limit, total, totalPages }.
        getMovies: builder.query({
            query: ({ page = 1, limit = 24, genre = '', search = '' } = {}) => ({
                url: '/movies',
                params: { page, limit, ...(genre && { genre }), ...(search && { search }) },
            }),
            providesTags: ['Movies'],
            keepUnusedDataFor: 300,
        }),
        getGenres: builder.query({
            query: () => '/genre',
            transformResponse: (response) => response.genres.map((genre) => genre.name),
            keepUnusedDataFor: 3600,
        }),
        getFavorites: builder.query({
            query: () => '/favorites',
            providesTags: ['Favorites'],
        }),
        // Both mutations update the cached list right away and roll back if the request fails.
        addFavorite: builder.mutation({
            query: (movie) => ({
                url: '/favorites',
                method: 'POST',
                body: { movieId: movie.id },
            }),
            async onQueryStarted(movie, { dispatch, queryFulfilled }) {
                const patch = dispatch(
                    moviesApiSlice.util.updateQueryData('getFavorites', undefined, (draft) => {
                        if (!draft.some((favorite) => favorite.id === movie.id)) draft.push(movie);
                    })
                );
                try {
                    await queryFulfilled;
                } catch {
                    patch.undo();
                }
            },
            invalidatesTags: ['Favorites'],
        }),
        removeFavorite: builder.mutation({
            query: (movie) => ({
                url: `/favorites/${movie.id}`,
                method: 'DELETE',
            }),
            async onQueryStarted(movie, { dispatch, queryFulfilled }) {
                const patch = dispatch(
                    moviesApiSlice.util.updateQueryData('getFavorites', undefined, (draft) =>
                        draft.filter((favorite) => favorite.id !== movie.id)
                    )
                );
                try {
                    await queryFulfilled;
                } catch {
                    patch.undo();
                }
            },
            invalidatesTags: ['Favorites'],
        }),
    }),
});

export const {
    useGetMoviesQuery,
    useGetGenresQuery,
    useGetFavoritesQuery,
    useAddFavoriteMutation,
    useRemoveFavoriteMutation,
} = moviesApiSlice;
