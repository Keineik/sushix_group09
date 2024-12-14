import { createContext, useState, useEffect } from 'react';
import { loginUser, registerUser, introspectToken } from '../api/auth';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Holds user info, currently unusable XD
    const [token, setToken] = useState(null); // Holds JWT token
    const [loading, setLoading] = useState(true); // Loading state during initialization
    const navigate = useNavigate();

    // Save JWT token securely in localStorage
    const saveToken = (token) => {
        localStorage.setItem('token', token);
        setToken(token);
    };

    // Load token and validate it on app load
    useEffect(() => {
        const initAuth = async () => {
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                try {
                    const introspectResponse = await introspectToken(storedToken);
                    setUser(introspectResponse.user); // fix this later AAAAAAAAAAAAAAAAAAAAAA
                    saveToken(storedToken);
                } catch (err) {
                    console.error("Token introspection failed");
                    logout();
                }
            }
            setLoading(false); // Stop loading after initialization
        };
        initAuth(); // Execute on app load
    }, []);

    // Login function
    const login = async (credentials) => {
        try {
            const response = await loginUser(credentials);
            saveToken(response.token);
            setUser(response.user); // fix this later AAAAAAAAAAAAAAAAAAAAAA
            navigate('/');
        } catch (error) {
            console.error("Login error: ", error);
            throw error;
        }
    };

    // Register function
    const register = async (registrationData) => {
        try {
            const user = await registerUser(registrationData);
            console.log("User registered successfully: ", user);
        } catch (error) {
            console.error("Registration error: ", error);
            throw error;
        }
    };

    // Logout function
    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        navigate('/login');
    };

    const value = {
        user,
        token,
        login,
        logout,
        register,
        loading,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};