import { useLocation, Navigate } from 'react-router-dom';

const RequireAuth = ({ children }) => {
    const location = useLocation();

    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
        return <Navigate to='/' state={{ from: location }} />;
    }

    return children;
};

export { RequireAuth };
