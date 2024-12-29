import api from "./api";

export const createReservation = async (reservationRequest) => {
    try {
        const response = await api.post('/customer/reservation', reservationRequest);
        return response.data.result;
    } catch (error) {
        console.error('Error creating reservation:', error);
        throw error;
    }
}