import * as React from "react";
import AdminNav from "../nav/AdminNav";
import UserNav from "../nav/UserNav";
import { Outlet } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const NavLayout = () => {
    const location = useLocation();
    const isAdminPage = location.pathname.startsWith('/admin');
    const isAdmin = true; // Replace with actual admin check logic

    return (
        <>
            { isAdmin && <AdminNav isAdminPage={ isAdminPage }/> }
            { isAdminPage ? null : <UserNav /> }
            <Outlet />
        </>
    );
}

export default NavLayout;