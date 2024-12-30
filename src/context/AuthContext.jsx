import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { introspectToken, loginUser, registerUser } from '../api/auth';
import { getCurrentCustomer } from '../api/customer';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); 
    const [loading, setLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);
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
                setIsAuth(true);
                const userResponse = await getCurrentCustomer();
                setUser(userResponse);
                setRole(jwtDecode(storedToken).scope);
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
            const authResponse = await loginUser(credentials);
            const storedToken = authResponse.token;
            saveToken(storedToken);
            const userResponse = await getCurrentCustomer();
            setUser(userResponse);
            setIsAuth(true);
            setRole(jwtDecode(storedToken).scope);
            navigate('/');
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
        setIsAuth(false);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, isAuth, role, login, register, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};