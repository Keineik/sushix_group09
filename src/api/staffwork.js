import api from './api';

export const createDineInOrder = async (dineInOrderRequest) => {
    try {
        const response = await api.post('/staff/dine-in-order', dineInOrderRequest);
        return response.data.result;
    } catch (error) {
        console.error('Error creating dine-in order:', error);
        throw error;
    }
};

export const updateDineInOrder = async (orderId, dineInOrderRequest) => {
    try {
        const response = await api.put(`/staff/dine-in-order/${orderId}`, dineInOrderRequest);
        return response.data.result;
    } catch (error) {
        console.error(`Error updating dine-in order with ID ${orderId}:`, error);
        throw error;
    }
};

export const createInvoice = async (invoiceRequest) => {
    try {
        const response = await api.post('/staff/invoice', invoiceRequest);
        return response.data.result;
    } catch (error) {
        console.error('Error creating invoice:', error);
        throw error;
    }
};