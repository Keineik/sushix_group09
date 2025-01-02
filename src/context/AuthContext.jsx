import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { introspectToken, loginUser, registerUser } from '../api/auth';
import { fetchCurrentAccount } from '../api/account';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); 
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState(null);
    const navigate = useNavigate();

    const saveToken = (token) => {
        Cookies.set('token', token, { expires: 7, secure: true, sameSite: 'Strict' });
    };

    const initAuth = async () => {
        const storedToken = Cookies.get('token');
        if (storedToken) {
            try {
                const introspectResponse = await introspectToken(storedToken);
                console.log('Token introspection response:', introspectResponse);
                if (!introspectResponse.valid) {
                    logout();
                    return;
                }
                const userRole = jwtDecode(storedToken).scope;
                setIsAuthenticated(true);
                const userResponse = await fetchCurrentAccount();
                setUser(userResponse);
                setRole(userRole);
            } catch (error) {
                console.error('Token introspection failed:', error);
                Cookies.remove('token');
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        initAuth();
    }, []);

    const login = async (credentials) => {
        try {
            console.log('Login credentials:', credentials);
            const authResponse = await loginUser(credentials);
            const storedToken = authResponse.token;
            saveToken(storedToken);
            const userResponse = await fetchCurrentAccount();
            
            setUser(userResponse);
            setIsAuthenticated(true);
            const userRole = jwtDecode(storedToken).scope;
            setRole(userRole);

            if (userRole === 'ADMIN') {
                navigate('/admin/company');
            } else if (userRole === 'STAFF MANAGER') {
                navigate('/admin/branch');
            } else if (userRole === 'STAFF') {
                navigate('/staff');
            } else {
                navigate('/');
            }
        } catch (error) {
            console.error("Login error: ", error);
            throw error;
        }
    };

    const register = async (registrationData) => {
        try {
            const user = await registerUser(registrationData);
            console.log("User registered successfully: ", user);
        } catch (error) {
            console.error("Registration error: ", error);
            throw error;
        }
    };

    const logout = () => {
        Cookies.remove('token');
        setUser(null);
        setRole(null);
        setIsAuthenticated(false);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, role, login, register, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};