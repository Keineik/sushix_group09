import api from './api';

// Fetch all branches
export const fetchBranches = async () => {
    try {
        const response = await api.get('/branch');
        return response.data;
    } catch (error) {
        console.error('Error fetching branches:', error);
        throw error;
    }
};

// Fetch a specific branch by ID
export const fetchBranch = async (branchId) => {
    try {
        const response = await api.get(`/branch/${branchId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching branch with ID ${branchId}:`, error);
        throw error;
    }
};

// Create a new branch
export const createBranch = async (branchRequest) => {
    try {
        const response = await api.post('/branch', branchRequest);
        return response.data;
    } catch (error) {
        console.error('Error creating branch:', error);
        throw error;
    }
};

// Update an existing branch
export const updateBranch = async (branchId, branchRequest) => {
    try {
        const response = await api.put(`/branch/${branchId}`, branchRequest);
        return response.data;
    } catch (error) {
        console.error(`Error updating branch with ID ${branchId}:`, error);
        throw error;
    }
};

// Delete a branch
export const deleteBranch = async (branchId) => {
    try {
        const response = await api.delete(`/branch/${branchId}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting branch with ID ${branchId}:`, error);
        throw error;
    }
};