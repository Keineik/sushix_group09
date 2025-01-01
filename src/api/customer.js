import api from './api';

export const fetchCustomers = async ({
    page = 1,
    limit = 18,
    searchTerm = '',
}) => {
    try {
        const response = await api.get('/customer', {
            params: {
                page,
                limit,
                searchTerm,
            },
        });
        return response.data.result;
    } catch (error) {
        console.error('Error fetching customers:', error);
        throw error;
    }
};

export const getCustomer = async (customerId) => {
    try {
        const response = await api.get(`/customer/${customerId}`);
        return response.data.result;
    } catch (error) {
        console.error(`Error fetching customer with ID ${customerId}:`, error);
        throw error;
    }
};

export const getCurrentCustomer = async () => {
    try {
        const response = await api.get('/customer/current');
        return response.data.result;
    } catch (error) {
        console.error('Error fetching current customer:', error);
        throw error;
    }
}

export const createCustomer = async (customerRequest) => {
    try {
        const response = await api.post('/customer', customerRequest);
        return response.data.result;
    } catch (error) {
        console.error('Error creating customer:', error);
        throw error;
    }
};

export const updateCustomer = async (customerId, customerRequest) => {
    try {
        const response = await api.put(`/customer/${customerId}`, customerRequest);
        return response.data.result;
    } catch (error) {
        console.error(`Error updating customer with ID ${customerId}:`, error);
        throw error;
    }
};

export const deleteCustomer = async (customerId) => {
    try {
        const response = await api.delete(`/customer/${customerId}`);
        return response.data.result;
    } catch (error) {
        console.error(`Error deleting customer with ID ${customerId}:`, error);
        throw error;
    }
};