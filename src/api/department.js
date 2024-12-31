import api from './api';

export const fetchDistinctDepartments = async () => {
    try {
        const response = await api.get('/department/distinct');
        return response.data.result;
    } catch (error) {
        console.error('Error fetching distinct departments:', error);
        throw error;
    }
}

// Fetch all departments
export const fetchDepartments = async () => {
    try {
        const response = await api.get('/department');
        return response.data.result;
    } catch (error) {
        console.error('Error fetching departments:', error);
        throw error;
    }
};

// Fetch a specific department by ID
export const getDepartment = async (deptId) => {
    try {
        const response = await api.get(`/department/${deptId}`);
        return response.data.result;
    } catch (error) {
        console.error(`Error fetching department with ID ${deptId}:`, error);
        throw error;
    }
};

// Update an existing department
export const updateDepartment = async (deptId, departmentRequest) => {
    try {
        const response = await api.put(`/department/${deptId}`, departmentRequest);
        return response.data.result;
    } catch (error) {
        console.error(`Error updating department with ID ${deptId}:`, error);
        throw error;
    }
};