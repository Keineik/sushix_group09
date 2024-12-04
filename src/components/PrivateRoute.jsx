import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, allowedRoles = ['company', 'staff', 'branch'] }) => {
    const userRole = localStorage.getItem('userRole');

    console.log('Allowed Role:', allowedRoles);
    console.log('User Role:', userRole);

    if (!userRole) {
        return <Navigate to="/private-login" />;
    }

    if (!allowedRoles.includes(userRole)) {
        console.log('Not     Alloweddddddddd');
        return <Navigate to="/unauthorized" />;
    }

    if (window.location.pathname === '/admin') {
        if (userRole === 'branch') return <Navigate to="/admin/branch" />;
        if (userRole === 'company') return <Navigate to="/admin/company" />;
    }

    return children;
};

export default PrivateRoute;