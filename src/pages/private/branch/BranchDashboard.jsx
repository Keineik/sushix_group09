import React, { useState, useEffect, useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import { fetchRevenueStats, fetchItemSalesStats } from '../../../api/stats';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { AuthContext } from '../../../context/AuthContext';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const BranchDashboard = () => {
    const { user } = useContext(AuthContext);
    const [timeInterval, setTimeInterval] = useState('month');
    const [timePeriod, setTimePeriod] = useState(30);
    const [sortDirection, setSortDirection] = useState(true);
    const [revenueData, setRevenueData] = useState(null);
    const [itemSalesData, setItemSalesData] = useState(null);
    const [itemRevenueData, setItemRevenueData] = useState(null);
    const branchId = user?.staff.department.branch.branchId; 

    useEffect(() => {
        const loadRevenueStats = async () => {
            try {
                const response = await fetchRevenueStats({
                    branchId,
                    groupBy: timeInterval,
                });
                console.log('Revenue stats:', response);
                setRevenueData(response);
            } catch (error) {
                console.error('Failed to fetch revenue stats:', error);
            }
        };

        const loadItemSalesStats = async () => {
            try {
                const response = await fetchItemSalesStats({
                    branchId,
                    region: '',
                    timePeriod,
                    sortDirection,
                    sortKey: 'Quantity'
                });
                console.log('Item sales stats:', response);
                setItemSalesData(response);
            } catch (error) {
                console.error('Failed to fetch item sales stats:', error);
            }
        };

        const loadItemRevenueStats = async () => {
            try {
                const response = await fetchItemSalesStats({
                    branchId,
                    region: '',
                    timePeriod,
                    sortDirection,
                    sortKey: 'Revenue'
                });
                console.log('Item revenue stats:', response);
                setItemRevenueData(response);
            } catch (error) {
                console.error('Failed to fetch item sales stats:', error);
            }
        };

        loadRevenueStats();
        loadItemRevenueStats();
        loadItemSalesStats();
    }, [timeInterval, timePeriod, sortDirection]);

    const formatRevenueData = () => {
        if (!revenueData) return null;

        const labels = revenueData.map(item => item.revenuePeriod);
        const data = revenueData.map(item => item.totalRevenue);

        return {
            labels,
            datasets: [
                {
                    label: 'Revenue (VND)',
                    data,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                },
            ],
        };
    };

    const formatItemSalesData = () => {
        if (!itemSalesData) return null;

        const labels = itemSalesData.map(item => item.itemName);
        const data = itemSalesData.map(item => item.totalSoldQuantity);

        return {
            labels,
            datasets: [
                {
                    label: 'Total Sold Quantity',
                    data,
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 1,
                },
            ],
        };
    };

    const formatItemRevenueData = () => {
        if (!itemRevenueData) return null;

        const labels = itemRevenueData.map(item => item.itemName);
        const data = itemRevenueData.map(item => item.totalRevenue);

        return {
            labels,
            datasets: [
                {
                    label: 'Total Revenue (VND)',
                    data,
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 1,
                },
            ],
        };
    };

    return (
        <div>
            <h1>Branch Dashboard</h1>
            <div>
                <label htmlFor="timeInterval">Time Interval: </label>
                <select
                    id="timeInterval"
                    value={timeInterval}
                    onChange={(e) => setTimeInterval(e.target.value)}
                >
                    <option value="day">Daily</option>
                    <option value="month">Monthly</option>
                    <option value="year">Yearly</option>
                </select>
            </div>
            <div>
                <h2>Revenue Stats</h2>
                {revenueData ? (
                    <Bar data={formatRevenueData()} />
                ) : (
                    <p>Loading revenue data...</p>
                )}
            </div>
            <h2 className='text-center'>Item Sales Stats</h2>
            <div className="d-flex justify-content-between">
                <div className="w-50 p-2">
                    <label htmlFor="timePeriod">Time Period: </label>
                    <select
                        id="timePeriod"
                        value={timePeriod}
                        onChange={(e) => setTimePeriod(Number(e.target.value))}
                    >
                        <option value={1}>1 Day</option>
                        <option value={7}>7 Days</option>
                        <option value={30}>30 Days</option>
                        <option value={0}>All Time</option>
                    </select>
                </div>
                <div className="w-50 p-2">
                    <label htmlFor="sortDirection">Sort Direction: </label>
                    <select
                        id="sortDirection"
                        value={sortDirection}
                        onChange={(e) => setSortDirection(e.target.value === 'true')}
                    >
                        <option value="true">Ascending</option>
                        <option value="false">Descending</option>
                    </select>
                </div>
            </div>
            <div className="d-flex justify-content-between">
                <div className="w-50 p-2">
                    {itemSalesData ? (
                        <Bar data={formatItemSalesData()} />
                    ) : (
                        <p>Loading item sales data...</p>
                    )}
                </div>
                <div className="w-50 p-2">
                    {itemRevenueData ? (
                        <Bar data={formatItemRevenueData()} />
                    ) : (
                        <p>Loading item revenue data...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BranchDashboard;