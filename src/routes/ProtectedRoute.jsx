import * as React from 'react';
import { Navigate, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { checkAuth } from '../api/axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../stores/slices/userSlice';

const ProtectedRoute = () => {
    const [connectedUser, setConnectedUser] = React.useState();
    const [authChecked, setAuthChecked] = React.useState(false);
    const [isAuth, setIsAuth] = React.useState(false);

    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAdminRoute = location.pathname.startsWith('/admin');
    const isAdmin = connectedUser?.roles?.includes('ROLE_ADMIN') || connectedUser?.roles?.includes('ROLE_SUPER_ADMIN');
    
    React.useEffect(() => {
        const initAuth = async () => {
            try {
                const user = await checkAuth();
                if (user) {
                    localStorage.setItem('extranet-user', JSON.stringify(user));
                    dispatch(setUser(user));
                    setConnectedUser(user);
                    setIsAuth(!!user);
                    setAuthChecked(true);
                } else {
                    navigate('/login');
                }
            } catch (e) {
                console.error('Auth check failed', e);
                navigate('/login');
            }
        };

        initAuth();
    }, [])

    if (!authChecked) return null; // or a spinner/loading indicator

    if (!isAuth) return <Navigate to="/login" replace />;

    if (isAdminRoute && !isAdmin) return <Navigate to="/dashboard" replace />;

    return <Outlet />;
};

export default ProtectedRoute;