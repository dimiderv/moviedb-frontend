import { Outlet } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentToken, selectPersist } from '../../features/auth/authSlice';
import { useRefreshMutation } from '../../features/auth/authApiSlice';
import { PageLoader } from '../PageState/PageState';

// On a full page load, trade the refresh cookie for a new access token when the user chose "trust this device".
const PersistLogin = () => {
    const token = useSelector(selectCurrentToken);
    const persist = useSelector(selectPersist);
    const [refresh] = useRefreshMutation();
    const [isChecking, setIsChecking] = useState(!token && persist);
    const hasRun = useRef(false);

    useEffect(() => {
        // StrictMode mounts twice in development; only refresh once.
        if (hasRun.current) return;
        hasRun.current = true;
        if (token || !persist) return;
        refresh().finally(() => setIsChecking(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isChecking) return <PageLoader label="Restoring your session…" fullscreen />;
    return <Outlet />;
};

export default PersistLogin;
