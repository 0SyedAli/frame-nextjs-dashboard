"use client";

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

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const IncomeChart = ({ data }) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    // Transform the API response data for the chart
    const chartData = {
        labels: data.map((item) => monthNames[item.month - 1]),
        datasets: [
            {
                label: `Total Revenue ($)`,
                data: data.map((item) => item.totalRevenue),
                backgroundColor: "#A83F98",
                borderColor: "#A83F98",
                borderWidth: 0,
                borderRadius: 15,
                borderSkipped: false,
            }
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            chartAreaBorder: {
                borderWidth: 0,
            }
            // title: {
            //     display: true,
            //     text: `Yearly Revenue ${data[0].totalRevenue}`,
            // },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return <Bar data={chartData} options={options} />;
};
export default IncomeChart;