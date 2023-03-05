import { useLocation, Navigate } from 'react-router-dom';

import { LocalStorageService, LS_KEYS } from '../services/LocalStorage';

const RequireAuth = ({ children }) => {
    const location = useLocation();

    const user = LocalStorageService.get(LS_KEYS.USER);

    if (!user) {
        return <Navigate to='/' state={{ from: location }} />;
    }

    return children;
};

export { RequireAuth };
