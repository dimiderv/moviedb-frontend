import { useEffect, useState } from 'react';

// The free Render backend sleeps when idle; tell the user when a request takes a while.
const useSlowRequestHint = (isLoading, delay = 4000) => {
    const [isSlow, setIsSlow] = useState(false);

    useEffect(() => {
        if (!isLoading) {
            setIsSlow(false);
            return undefined;
        }
        const timer = setTimeout(() => setIsSlow(true), delay);
        return () => clearTimeout(timer);
    }, [isLoading, delay]);

    return isSlow;
};

export default useSlowRequestHint;
