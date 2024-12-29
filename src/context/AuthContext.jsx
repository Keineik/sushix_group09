import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { introspectToken, loginUser, registerUser } from '../api/auth';
import { getCurrentCustomer } from '../api/customer';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); 
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const saveToken = (token) => {
        Cookies.set('token', token, { expires: 7, secure: true, sameSite: 'Strict' });
        setToken(token);
    };

    useEffect(() => {
        const initAuth = async () => {
            const storedToken = Cookies.get('token');
            if (storedToken) {
                try {
                    const introspectResponse = await introspectToken(storedToken);
                    setUser(introspectResponse.user);
                    setToken(storedToken);
                } catch (error) {
                    console.error('Token introspection failed:', error);
                    Cookies.remove('token');
                }
            }
            setLoading(false);
        };

        initAuth();
    }, []);

    const login = async (credentials) => {
        try {
            const authResponse = await loginUser(credentials);
            saveToken(authResponse.token);
            const userResponse = await getCurrentCustomer();
            setUser(userResponse);
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
        setToken(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout, setUser }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};