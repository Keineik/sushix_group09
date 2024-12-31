import api from './api';

export const fetchAccounts = async () => {
    const response = await api.get('/account');
    return response.data.result;
};

export const fetchAccount = async (accountId) => {
    const response = await api.get(`/account/${accountId}`);
    return response.data.result;
};

export const fetchCurrentAccount = async () => {
    const response = await api.get('/account/current');
    return response.data.result;
}

export const deleteAccount = async (accountId) => {
    const response = await api.delete(`/account/${accountId}`);
    return response.data.result;
}