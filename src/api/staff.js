import api from './api';

export const fetchStaffs = async ({
    page = 1,
    limit = 18,
    searchTerm = '',
    branchId = 0,
    department = '',
}) => {
    try {
        const response = await api.get('/staff', {
            params: { page, limit, searchTerm, branchId, department },
        });
        return response.data.result;
    } catch (error) {
        console.error('Error fetching staffs:', error);
        throw error;
    }
}

export const fetchStaff = async (staffId) => {
    try {
        const response = await api.get(`/staff/${staffId}`);
        return response.data.result;
    } catch (error) {
        console.error(`Error fetching staff with ID ${staffId}:`, error);
        throw error;
    }
}

export const fetchStaffWorkHistory = async (staffId) => {
    try {
        const response = await api.get(`/staff/${staffId}/work-history`);
        return response.data.result;
    } catch (error) {
        console.error(`Error fetching work history for staff with ID ${staffId}:`, error);
        throw error;
    }
}

export const createStaff = async (staffRequest) => {
    try {
        const response = await api.post('/staff', staffRequest);
        return response.data.result;
    } catch (error) {
        console.error('Error creating staff:', error);
        throw error;
    }
}

export const updateStaff = async (staffId, staffRequest) => {
    try {
        const response = await api.put(`/staff/${staffId}`, staffRequest);
        return response.data.result;
    } catch (error) {
        console.error(`Error updating staff with ID ${staffId}:`, error);
        throw error;
    }
}

export const deleteStaff = async (staffId) => {
    try {
        const response = await api.delete(`/staff/${staffId}`);
        return response.data.result;
    } catch (error) {
        console.error(`Error deleting staff with ID ${staffId}:`, error);
        throw error;
    }
}