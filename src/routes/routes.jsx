import { createBrowserRouter, Navigate } from 'react-router'
import App from '../App.jsx'
import Login from '../components/pages/login/Login.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'
import NavLayout from '../components/layouts/NavLayout.jsx'
import Support from '../components/pages/user/Support.jsx'
import Tools from '../components/pages/user/Tools.jsx'
import Documentation from '../components/pages/user/Documentation.jsx'
import AdminDashboard from '../components/pages/admin/AdminDashboard.jsx'

export const router = createBrowserRouter([
    {
        index: true,
        element: <Navigate to="/dashboard" replace />,
    },
    {
        path: 'login',
        element: <Login />,
    },
    {
        path: '',
        element: <ProtectedRoute />,
        children: [
            {
                element: <NavLayout />,
                children: [
                    { index: true, path: 'dashboard', element: <App /> },
                    { path: 'support', element: <Support /> },
                    { path: 'tools', element: <Tools /> },
                    { path: 'documentation', element: <Documentation /> },
                ],
            },
        ],
    },
    {
        path: 'admin',
        element: <ProtectedRoute />,
        children: [
            {
                element: <NavLayout />,
                children: [
                    { index: true, path: 'dashboard', element: <AdminDashboard /> },
                ],
            },
        ],
    },
]);