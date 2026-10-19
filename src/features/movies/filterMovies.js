// Client-side match on title or cast member, used for the (small) favorites list.
export const filterMovies = (movies = [], search = '') => {
    const query = search.trim().toLowerCase();
    if (!query) return movies;
    return movies.filter(
        (movie) =>
            movie.title.toLowerCase().includes(query) ||
            movie.cast.some((actor) => actor.toLowerCase().includes(query))
    );
};
