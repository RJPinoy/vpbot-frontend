import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { checkAuth } from '../api/axios';

const ProtectedRoute = () => {
    const [authChecked, setAuthChecked] = React.useState(false);
    const [isAuth, setIsAuth] = React.useState(false);
    const [isAdmin, setIsAdmin] = React.useState(false);

    React.useEffect(() => {
        const check = async () => {
            const user = await checkAuth();

            if (user) {
                localStorage.setItem('extranet-user', JSON.stringify(user));
                setIsAuth(true);
                setIsAdmin(user.roles.includes('ADMIN'));
            }

            setAuthChecked(true);
        };

        check();
    }, []);

    if (!authChecked) return null; // or a spinner/loading indicator

    if (!isAuth) return <Navigate to="/login" replace />;

    return <Outlet />;
}

export default ProtectedRoute;