import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const userRole = localStorage.getItem('userRole');

    if (!userRole) {
        return <Navigate to="/private-login" />;
    }

    if (window.location.pathname === '/admin') {
        if (userRole === 'company') {
            return <Navigate to="/admin/company" />;
        }
        if (userRole === 'branch') {
            return <Navigate to="/admin/branch" />;
        }
        if (userRole === 'staff') {
            return <Navigate to="/staff" />;
        }
    }

    return children;
};

export default PrivateRoute;