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

export const getAllRestaurantTables = async () => {
    try {
        const response = await api.get('/staff/table');
        return response.data.result;
    } catch (error) {
        console.error('Error fetching restaurant tables:', error);
        throw error;
    }
};


export const updateOrderStatus = async (orderId, orderStatus) => {
    try {
        const response = await api.put(`/staff/order/${orderId}?orderStatus=${orderStatus}`);
        return response.data.result;
    } catch (error) {
        console.error(`Error updating order status for ID ${orderId}:`, error);
        throw error;
    }
};


export const getAllBranchMenuItems = async () => {
    try {
        const response = await api.get('/staff/branch-menu-item');
        return response.data.result;
    } catch (error) {
        console.error('Error fetching branch menu items:', error);
        throw error;
    }
};


export const createBranchMenuItem = async (branchMenuItemRequest) => {
    try {
        const response = await api.post('/staff/branch-menu-item', branchMenuItemRequest);
        return response.data.result;
    } catch (error) {
        console.error('Error creating branch menu item:', error);
        throw error;
    }
};


export const updateBranchMenuItem = async (itemId, branchMenuItemRequest) => {
    try {
        const response = await api.put(`/staff/branch-menu-item/${itemId}`, branchMenuItemRequest);
        return response.data.result;
    } catch (error) {
        console.error(`Error updating branch menu item with ID ${itemId}:`, error);
        throw error;
    }
};

export const deleteBranchMenuItem = async (itemId) => {
    try {
        const response = await api.delete(`/staff/branch-menu-item/${itemId}`);
        return response.data.result;
    } catch (error) {
        console.error(`Error deleting branch menu item with ID ${itemId}:`, error);
        throw error;
    }
};