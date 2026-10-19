// Matches on title or cast member, case-insensitively.
export const filterMovies = (movies = [], search = '') => {
    const query = search.trim().toLowerCase();
    if (!query) return movies;
    return movies.filter(
        (movie) =>
            movie.title.toLowerCase().includes(query) ||
            movie.cast.some((actor) => actor.toLowerCase().includes(query))
    );
};

export const byNewest = (a, b) => Number(b.year) - Number(a.year) || a.title.localeCompare(b.title);
