import api from './api';

// Fetch all card types
export const fetchCardTypes = async () => {
    try {
        const response = await api.get('/card-type');
        return response.data.result;
    } catch (error) {
        console.error('Error fetching card types:', error);
        throw error;
    }
};

// Fetch a specific card type by ID
export const getCardType = async (cardTypeId) => {
    try {
        const response = await api.get(`/card-type/${cardTypeId}`);
        return response.data.result;
    } catch (error) {
        console.error(`Error fetching card type with ID ${cardTypeId}:`, error);
        throw error;
    }
};

// Create a new card type
export const createCardType = async (cardTypeRequest) => {
    try {
        const response = await api.post('/card-type', cardTypeRequest);
        return response.data.result;
    } catch (error) {
        console.error('Error creating card type:', error);
        throw error;
    }
};

// Update an existing card type
export const updateCardType = async (cardTypeId, cardTypeRequest) => {
    try {
        const response = await api.put(`/card-type/${cardTypeId}`, cardTypeRequest);
        return response.data.result;
    } catch (error) {
        console.error(`Error updating card type with ID ${cardTypeId}:`, error);
        throw error;
    }
};

// Delete a card type
export const deleteCardType = async (cardTypeId) => {
    try {
        const response = await api.delete(`/card-type/${cardTypeId}`);
        return response.data.result;
    } catch (error) {
        console.error(`Error deleting card type with ID ${cardTypeId}:`, error);
        throw error;
    }
};