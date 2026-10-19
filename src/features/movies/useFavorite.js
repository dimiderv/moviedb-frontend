import { useGetFavoritesQuery, useAddFavoriteMutation, useRemoveFavoriteMutation } from './moviesApiSlice';
import { useToast } from '../../context/ToastContext';
import { getErrorMessage } from '../../utils/getErrorMessage';

export const useFavorite = (movie) => {
    const { isFavorite } = useGetFavoritesQuery(undefined, {
        selectFromResult: ({ data }) => ({
            isFavorite: Boolean(data?.some((favorite) => favorite.id === movie.id)),
        }),
    });
    const [addFavorite, { isLoading: isAdding }] = useAddFavoriteMutation();
    const [removeFavorite, { isLoading: isRemoving }] = useRemoveFavoriteMutation();
    const { notify } = useToast();

    const toggleFavorite = async () => {
        try {
            if (isFavorite) {
                await removeFavorite(movie).unwrap();
                notify(`Removed ${movie.title} from favorites.`);
            } else {
                const response = await addFavorite(movie).unwrap();
                notify(response?.message || `Added ${movie.title} to favorites.`);
            }
        } catch (err) {
            notify(getErrorMessage(err, 'Could not update your favorites.'), 'danger');
        }
    };

    return { isFavorite, toggleFavorite, isBusy: isAdding || isRemoving };
};
