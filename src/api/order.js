import api from './api';

// Fetch all orders
export const fetchOrders = async ({
    page = 1,
    limit = 18,
    searchTerm = '',
    branchId = 0,
    custId = 0,
    orderStatus = '',
    orderType = '',
    sortDirection = true,
}) => {
    try {
        const response = await api.get('/order', {
            params: {
                page,
                limit,
                searchTerm,
                branchId,
                custId,
                orderStatus,
                orderType,
                sortDirection,
            },
        });
        return response.data.result;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
};

// Fetch dine-in order by ID
export const fetchDineInOrder = async (orderId) => {
    try {
        const response = await api.get(`/order/dine-in/${orderId}`);
        return response.data.result;
    } catch (error) {
        console.error('Error fetching dine-in order:', error);
        throw error;
    }
};

// Fetch delivery order by ID
export const fetchDeliveryOrder = async (orderId) => {
    try {
        const response = await api.get(`/order/delivery/${orderId}`);
        return response.data.result;
    } catch (error) {
        console.error('Error fetching delivery order:', error);
        throw error;
    }
};