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
        path: '/',
        element: <Navigate to="/login" replace />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/',
        element: <ProtectedRoute />,
        children: [
        {
            element: <NavLayout />,
            children: [
                { path: 'dashboard', element: <App /> },
                { path: 'support', element: <Support /> },
                { path: 'tools', element: <Tools /> },
                { path: 'documentation', element: <Documentation /> },
            ],
        },
        ],
    },
    {
        path: '/admin/',
        element: <ProtectedRoute adminOnly={true} />,
        children: [
        {
            element: <NavLayout />,
            children: [
                { path: 'dashboard', element: <AdminDashboard /> },
            ]
        },
        ],
    },
]);