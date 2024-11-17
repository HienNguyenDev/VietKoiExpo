import React, { useState, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

Chart.register(...registerables);

const StatisticDiagram = () => {
  const [chartData, setChartData] = useState({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Số lượng cuộc thi tổ chức theo từng tháng',
        data: Array(12).fill(0), // Initialize with zeros
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  });

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const response = await axios.get('https://vietkoiexpo-backend.hiennguyendev.id.vn/api/Competition');
        const competitions = response.data;

        // Process data to count the number of competitions organized each month
        const monthlyCounts = Array(12).fill(0);
        competitions.forEach(comp => {
          const month = new Date(comp.startDate).getMonth(); // Get month (0-11)
          monthlyCounts[month]++;
        });

        // Update chart data
        setChartData(prevData => ({
          ...prevData,
          datasets: [
            {
              ...prevData.datasets[0],
              data: monthlyCounts,
            },
          ],
        }));
      } catch (error) {
        console.error('Error fetching competitions:', error);
      }
    };

    fetchCompetitions();
  }, []);

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className='containerStatisticsDiagram' style={{ background: '#ffffff', padding: '20px', borderRadius: '10px' }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default StatisticDiagram;