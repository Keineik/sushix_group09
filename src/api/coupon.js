import api from './api';

// Fetch all coupons
export const fetchCoupons = async () => {
    try {
        const response = await api.get('/coupon');
        return response.data.result;
    } catch (error) {
        console.error('Error fetching coupons:', error);
        throw error;
    }
};

// Fetch a specific coupon by ID
export const getCoupon = async (couponId) => {
    try {
        const response = await api.get(`/coupon/${couponId}`);
        return response.data.result;
    } catch (error) {
        console.error(`Error fetching coupon with ID ${couponId}:`, error);
        throw error;
    }
};

// Create a new coupon
export const createCoupon = async (couponRequest) => {
    try {
        const response = await api.post('/coupon', couponRequest);
        return response.data.result;
    } catch (error) {
        console.error('Error creating coupon:', error);
        throw error;
    }
};

// Update an existing coupon
export const updateCoupon = async (couponId, couponRequest) => {
    try {
        const response = await api.put(`/coupon/${couponId}`, couponRequest);
        return response.data.result;
    } catch (error) {
        console.error(`Error updating coupon with ID ${couponId}:`, error);
        throw error;
    }
};

// Delete a coupon
export const deleteCoupon = async (couponId) => {
    try {
        const response = await api.delete(`/coupon/${couponId}`);
        return response.data.result;
    } catch (error) {
        console.error(`Error deleting coupon with ID ${couponId}:`, error);
        throw error;
    }
};