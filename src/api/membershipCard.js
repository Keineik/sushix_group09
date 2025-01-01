import api from './api';

// Fetch all membership cards
export const fetchMembershipCards = async () => {
    try {
        const response = await api.get('/membership-card');
        return response.data.result;
    } catch (error) {
        console.error('Error fetching membership cards:', error);
        throw error;
    }
};

// Fetch a specific membership card by ID
export const getMembershipCard = async (cardId) => {
    try {
        const response = await api.get(`/membership-card/${cardId}`);
        return response.data.result;
    } catch (error) {
        console.error(`Error fetching membership card with ID ${cardId}:`, error);
        throw error;
    }
};

export const fetchMembershipCardByCustomer = async (customerId) => {
    try {
        const response = await api.get(`/membership-card/customer/${customerId}`);
        return response.data.result;
    } catch (error) {
        console.error(`Error fetching membership cards for customer with ID ${customerId}:`, error);
        throw error;
    }
};

// Create a new membership card
export const createMembershipCard = async (membershipCardRequest) => {
    try {
        const response = await api.post('/membership-card', membershipCardRequest);
        return response.data.result;
    } catch (error) {
        console.error('Error creating membership card:', error);
        throw error;
    }
};

// Update an existing membership card
export const updateMembershipCard = async (cardId, membershipCardRequest) => {
    try {
        const response = await api.put(`/membership-card/${cardId}`, membershipCardRequest);
        return response.data.result;
    } catch (error) {
        console.error(`Error updating membership card with ID ${cardId}:`, error);
        throw error;
    }
};

// Delete a membership card
export const deleteMembershipCard = async (cardId) => {
    try {
        const response = await api.delete(`/membership-card/${cardId}`);
        return response.data.result;
    } catch (error) {
        console.error(`Error deleting membership card with ID ${cardId}:`, error);
        throw error;
    }
};