import api from './api'

export const fetchCategories = async () => {
    try {
        const response = await api.get('/menu-category');
        return response.data.result;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
}

export const fetchCategory = async (id) => {
    try {
        const response = await api.get(`/menu-category/${id}`);
        return response.data.result;
    } catch (error) {
        console.error('Error fetching category:', error);
    }
}

export const createCategory = async (categoryName) => {
    try {
        const response = await api.post('/menu-category', categoryName);
        return response.data.result;
    } catch (error) {
        console.error('Error creating category:', error);
    }
}

export const updateCategory = async (id, categoryName) => {
    try {
        const response = await api.put(`/menu-category/${id}`, categoryName);
        return response.data.result;
    } catch (error) {
        console.error('Error updating category:', error);
    }
}

export const deleteCategory = async (id) => {
    try {
        const response = await api.delete(`/menu-category/${id}`);
        return response.data.result;
    } catch (error) {
        console.error('Error deleting category:', error);
    }
}