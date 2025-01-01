import api from "./api";

export const fetchReservations = async ({
    page = 1,
    limit = 10,
    searchTerm = '',
    branchId = 0,
    sortDirection = false,
}) => {
    try {
        const response = await api.get('/reservation', {
            params: { page, limit, searchTerm, branchId, sortDirection },
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