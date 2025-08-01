import * as React from "react";
import AdminNav from "../pages/nav/AdminNav";
import UserNav from "../pages/nav/UserNav";
import { Outlet } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";

const NavLayout = () => {
    const roles = useSelector((state) => state.userSlice.user?.roles || []);
    const isAdmin = roles.includes('ROLE_ADMIN') || roles.includes('ROLE_SUPER_ADMIN');
    const location = useLocation();
    const isAdminPage = location.pathname.startsWith('/admin');

    return (
        <>
            { isAdmin && <AdminNav isAdminPage={ isAdminPage }/> }
            { isAdminPage ? null : <UserNav /> }
            <Outlet />
        </>
    );
}

export default NavLayout;