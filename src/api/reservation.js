import api from "./api";

export const fetchReservations = async ({
    page = 1,
    limit = 10,
    searchTerm = '',
    status = '',
    branchId = 0,
    sortDirection = true,
}) => {
    try {
        const response = await api.get('/reservation', {
            params: { page, limit, searchTerm, status, branchId, sortDirection },
        });
        return response.data.result;
    } catch (error) {
        console.error('Error fetching reservations:', error);
        throw error;
    }
}

export const fetchReservation = async (reservationId) => {
    try {
        const response = await api.get(`/reservation/${reservationId}`);
        return response.data.result;
    } catch (error) {
        console.error(`Error fetching reservation with ID ${reservationId}:`, error);
        throw error;
    }
}

export const updateReservation = async (reservationId, data) => {
    try {
        const response = await api.put(`/reservation/${reservationId}`, data);
        return response.data.result;
    } catch (error) {
        console.error(`Error updating reservation with ID ${reservationId}:`, error);
        throw error;
    }
}