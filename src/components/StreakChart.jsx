import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StreakChart = ({ data }) => {
  const chartData = {
    labels: data.labels || ['L', 'M', 'M', 'J', 'V', 'S', 'D'],
    datasets: [
      {
        label: 'Prácticas por día',
        data: data.values || [],
        backgroundColor: [
          'rgba(30, 58, 138, 0.8)',
          'rgba(30, 58, 138, 0.8)',
          'rgba(30, 58, 138, 0.8)',
          'rgba(30, 58, 138, 0.8)',
          'rgba(30, 58, 138, 0.8)',
          'rgba(30, 58, 138, 0.8)',
          'rgba(30, 58, 138, 0.8)',
        ],
        borderColor: [
          'rgba(30, 58, 138, 1)',
          'rgba(30, 58, 138, 1)',
          'rgba(30, 58, 138, 1)',
          'rgba(30, 58, 138, 1)',
          'rgba(30, 58, 138, 1)',
          'rgba(30, 58, 138, 1)',
          'rgba(30, 58, 138, 1)',
        ],
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14,
        },
        bodyFont: {
          size: 13,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div style={{ height: '250px', width: '100%' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default StreakChart;
