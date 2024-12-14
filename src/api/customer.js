import api from './api';

// Fetch all customers
export const fetchCustomers = async () => {
    try {
        const response = await api.get('/customer');
        return response.data.result;
    } catch (error) {
        console.error('Error fetching customers:', error);
        throw error;
    }
};

// Fetch a specific customer by ID
export const getCustomer = async (customerId) => {
    try {
        const response = await api.get(`/customer/${customerId}`);
        return response.data.result;
    } catch (error) {
        console.error(`Error fetching customer with ID ${customerId}:`, error);
        throw error;
    }
};

// Create a new customer
export const createCustomer = async (customerRequest) => {
    try {
        const response = await api.post('/customer', customerRequest);
        return response.data.result;
    } catch (error) {
        console.error('Error creating customer:', error);
        throw error;
    }
};

// Update an existing customer
export const updateCustomer = async (customerId, customerRequest) => {
    try {
        const response = await api.put(`/customer/${customerId}`, customerRequest);
        return response.data.result;
    } catch (error) {
        console.error(`Error updating customer with ID ${customerId}:`, error);
        throw error;
    }
};

// Delete a customer by ID
export const deleteCustomer = async (customerId) => {
    try {
        const response = await api.delete(`/customer/${customerId}`);
        return response.data.result;
    } catch (error) {
        console.error(`Error deleting customer with ID ${customerId}:`, error);
        throw error;
    }
};