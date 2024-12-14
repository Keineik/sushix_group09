import { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

// Register required scales and elements for Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const BranchDashboard = () => {
    // State for the selected time interval
    const [timeInterval, setTimeInterval] = useState("monthly");

    // Data for different time intervals
    const timeData = {
        daily: {
            labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
            datasets: [
                {
                    label: "Revenue ($)",
                    data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 500)), // Example: Random revenue data
                    backgroundColor: "rgba(255, 99, 132, 0.6)",
                    borderColor: "rgba(255, 99, 132, 1)",
                    borderWidth: 1,
                },
            ],
        },
        monthly: {
            labels: ["January", "February", "March", "April", "May"],
            datasets: [
                {
                    label: "Revenue ($)",
                    data: [5000, 10000, 7500, 12500, 11000],
                    backgroundColor: "rgba(75, 192, 192, 0.6)",
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 1,
                },
            ],
        },
        quarterly: {
            labels: ["Q1", "Q2", "Q3", "Q4"],
            datasets: [
                {
                    label: "Revenue ($)",
                    data: [30000, 40000, 45000, 50000],
                    backgroundColor: "rgba(54, 162, 235, 0.6)",
                    borderColor: "rgba(54, 162, 235, 1)",
                    borderWidth: 1,
                },
            ],
        },
    };

    // Chart options
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: `${timeInterval.charAt(0).toUpperCase() + timeInterval.slice(1)} Revenue`,
            },
        },
    };

    return (
        <div className="container-fluid py-4">
            <h2 className="mb-4">Dashboard</h2>

            {/* Buttons to toggle between time intervals */}
            <div className="mb-4">
                <button
                    className={`btn btn-primary me-2 ${timeInterval === "daily" ? "active" : ""}`}
                    onClick={() => setTimeInterval("daily")}
                >
                    Daily
                </button>
                <button
                    className={`btn btn-primary me-2 ${timeInterval === "monthly" ? "active" : ""}`}
                    onClick={() => setTimeInterval("monthly")}
                >
                    Monthly
                </button>
                <button
                    className={`btn btn-primary ${timeInterval === "quarterly" ? "active" : ""}`}
                    onClick={() => setTimeInterval("quarterly")}
                >
                    Quarterly
                </button>
            </div>

            {/* Chart Component */}
            <Bar data={timeData[timeInterval]} options={chartOptions} />
        </div>
    );
};

export default BranchDashboard;