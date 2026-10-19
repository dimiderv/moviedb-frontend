import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const ToastContext = createContext({ toasts: [], notify: () => {}, dismiss: () => {} });

const MAX_TOASTS = 4;
let nextId = 0;

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const notify = useCallback((message, variant = 'success') => {
        nextId += 1;
        const toast = { id: nextId, message, variant };
        setToasts((prev) => [...prev.slice(-(MAX_TOASTS - 1)), toast]);
    }, []);

    const dismiss = useCallback((id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    const value = useMemo(() => ({ toasts, notify, dismiss }), [toasts, notify, dismiss]);

    return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
};

export const useToast = () => useContext(ToastContext);
