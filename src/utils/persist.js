const KEY = 'persist';

export const loadPersist = () => {
    try {
        return JSON.parse(localStorage.getItem(KEY)) === true;
    } catch {
        return false;
    }
};

export const savePersist = (value) => {
    try {
        localStorage.setItem(KEY, JSON.stringify(Boolean(value)));
    } catch {
        // Storage can be unavailable (private mode); the choice then lasts for this tab only.
    }
};
