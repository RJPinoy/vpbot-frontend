import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
// import { isAuthenticated } from '../api/user/route';

const ProtectedRoute = ({ adminOnly = false }) => {
    const [authChecked, setAuthChecked] = React.useState(false);
    const [isAuth, setIsAuth] = React.useState(false);
    const [isAdmin, setIsAdmin] = React.useState(false);

    React.useEffect(() => {
        const checkAuth = async () => {
            // const user = await isAuthenticated();
            setIsAuth(true);
            setAuthChecked(true);
        };

        checkAuth();
    }, []);

    if (!authChecked) return null; // or a spinner/loading indicator

    if (!isAuth) return <Navigate to="/login" replace />;
    // if (adminOnly && !isAdmin) return <Navigate to="/dashboard" replace />;

    return <Outlet />;
}

export default ProtectedRoute;