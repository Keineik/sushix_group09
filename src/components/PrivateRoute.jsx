import React from 'react';
import { Navigate } from 'react-router-dom';

// Need changes here
const PrivateRoute = ({ children, allowedRoles = ['company', 'staff', 'branch'] }) => {
    const userRole = localStorage.getItem('userRole');

    if (!userRole) {
        return <Navigate to="/private-login" />;
    }

    if (!allowedRoles.includes(userRole)) {
        return <Navigate to="/unauthorized" />;
    }

    if (window.location.pathname === '/admin') {
        if (userRole === 'branch') return <Navigate to="/admin/branch" />;
        if (userRole === 'company') return <Navigate to="/admin/company" />;
    }

    return children;
};

export default PrivateRoute;