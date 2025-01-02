import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children, allowedRoles = ['ADMIN', 'STAFF MANAGER', 'STAFF'] }) => {
    const { role } = useContext(AuthContext);
    console.log('Role:', role);

    if (!role) {
        return <Navigate to="/login" />;
    }

    if (!allowedRoles.includes(role)) {
        return <Navigate to="/unauthorized" />;
    }

    if (window.location.pathname === '/admin') {
        if (role === 'STAFF MANAGER') return <Navigate to={`/admin/branch/`} />;
        if (role === 'ADMIN') return <Navigate to="/admin/company" />;
    }

    return children;
};

export default PrivateRoute;