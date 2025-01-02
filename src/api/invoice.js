import api from "./api";

// Get all invoices
export const fetchInvoices = async ({
    page = 1,
    limit = 18,
    searchTerm = '',
    branchId = 0,
    startDate = '',
    endDate = '',
    sortDirection = true,
}) => {
    try {
        const response = await api.get('/invoice', {
            params: { page, limit, searchTerm, branchId, startDate, endDate, sortDirection },
        });
        return response.data.result;
    } catch (error) {
        console.error('Error fetching invoices:', error);
        throw error;
    }
}