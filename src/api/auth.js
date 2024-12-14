import api from './api';

// Register user
export const registerUser = async (registerData) => {
    const response = await api.post('/auth/register', registerData);
    return response.data.result;
};

// Login user
export const loginUser = async (loginData) => {
    const response = await api.post('/auth/login', loginData);
    return response.data.result;
};

// Token introspection (to validate token)
export const introspectToken = async (token) => {
    const response = await api.post('/auth/introspect', { token });
    return response.data.result;
};