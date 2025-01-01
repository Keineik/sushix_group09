import api from "./api";

// Fetch all orders
export const fetchOrders = async ({
    page = 1,
    limit = 18,
    searchTerm = '',
    branchId = 0,
    customerID = 0,
    orderStatus = '',
    orderType = '',
    sortKey = 'OrderDateTime',
    sortDirection = 0, 
}) => {
    try {
        const response = await api.get('/orders', {
            params: {
                page,
                limit,
                searchTerm,
                branchId,
                customerID,
                orderStatus,
                orderType,
                sortKey,
                sortDirection,
            },
        });
        if (response.data && response.data.result) {
            return response.data.result;
        } else {
            console.warn('Unexpected response structure:', response.data);
            return [];
        }
    } catch (error) {
        console.error('Error fetching orders:', error.message || error);
        throw new Error('Failed to fetch orders. Please try again later.');
    }
};
