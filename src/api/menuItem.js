import api from './api';

// Fetch paginated menu items
export const fetchMenuItems = async ({
                                         page = 1,
                                         limit = 18,
                                         searchTerm = '',
                                         categoryId = 0,
                                         branchId = 0,
                                         filterShippable = 0,
                                         sortKey = 'ID',
                                         sortDirection = false,
                                     }) => {
    try {
        const response = await api.get('/menu-item', {
            params: {page, limit, searchTerm, categoryId, branchId, filterShippable, sortKey, sortDirection},
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching menu items:', error);
        throw error;
    }
};

// Fetch a specific menu item by ID
export const getMenuItem = async (itemId) => {
    try {
        const response = await api.get(`/menu-item/${itemId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching menu item:', error);
        throw error;
    }
};

// Create a new menu item
export const createMenuItem = async (menuItemRequest) => {
    try {
        const response = await api.post('/menu-item', menuItemRequest);
        return response.data;
    } catch (error) {
        console.error('Error creating menu item:', error);
        throw error;
    }
};

// Update an existing menu item
export const updateMenuItem = async (itemId, menuItemRequest) => {
    try {
        const response = await api.put(`/menu-item/${itemId}`, menuItemRequest);
        return response.data;
    } catch (error) {
        console.error('Error updating menu item:', error);
        throw error;
    }
};

// Delete a menu item
export const deleteMenuItem = async (itemId) => {
    try {
        const response = await api.delete(`/menu-item/${itemId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting menu item:', error);
        throw error;
    }
};