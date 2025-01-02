import api from "./api";

export const fetchRevenueStats = async ({
    branchId,
    groupBy
}
) => {
    try {
        const response = await api.get(`/stats/revenue`, {
            params: {
                branchId,
                groupBy
            }
        });
        return response.data.result;
    } catch (err) {
        console.error('Failed to fetch revenue stats:', err);
    }
}

export const fetchItemSalesStats = async ({
    branchId,
    region,
    timePeriod,
    sortDirection,
    sortKey
}
) => {
    try {
        const response = await api.get(`/stats/item-sales`, {
            params: {
                branchId,
                region,
                timePeriod,
                sortDirection,
                sortKey
            }
        });
        return response.data.result;
    } catch (err) {
        console.error('Failed to fetch item sales stats:', err);
    }
}