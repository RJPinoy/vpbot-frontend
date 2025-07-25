import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = () => {
    const isAuthenticated = useSelector((state) => state.userSlice.isAuthenticated);
    const isAdmin = useSelector((state) => state.userSlice.user.roles?.includes('ROLE_ADMIN') || state.userSlice.user.roles?.includes('ROLE_SUPER_ADMIN'));
    const location = useLocation();

    if (!isAuthenticated) return <Navigate to="/login" replace />;
    console.log(isAuthenticated);

    const isAdminRoute = location.pathname.startsWith('/admin');
    if (isAdminRoute && !isAdmin) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;