import React from 'react'
import { Chart,registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { LinearScale } from 'chart.js';

Chart.register(...registerables);

const StatisticDiagram = () => {
    
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June','July','August'], // replace with your data
        datasets: [
          {
            label: 'Số lượng người tham gia cuộc thi theo từng tháng',
            data: [30, 120, 110, 140, 150, 151,173,165], // replace with your data
            fill: false,
            backgroundColor: 'rgb(75, 192, 192)',
            borderColor: 'rgba(75, 192, 192, 0.2)',
          },
        ],
      };
      
      const options = {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      };

  return (
    <div className='containerStatisticsDiagram' style={{background:''}} >
        <Line data={data} options={options}></Line>
    </div>
  )
}

export default StatisticDiagram