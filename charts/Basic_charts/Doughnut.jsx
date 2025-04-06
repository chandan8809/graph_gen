import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { pieColors } from '../common/ColorPalettes';

const DoughnutChart = ({ tableData, onDownload }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;
    
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    
    // Prepare data for the chart
    const labels = tableData[0].slice(1, -1).filter(label => label !== '');
    
    // For doughnut charts, only use the first data row
    const data = [];
    for (let j = 1; j < tableData[0].length - 1; j++) {
      if (tableData[0][j] !== '') {
        const value = parseFloat(tableData[1][j]) || 0;
        data.push(value);
      }
    }
    
    const options = {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Data Visualization (Doughnut Chart)'
        },
        legend: {
          position: 'top',
        }
      }
    };

    chartInstance.current = new Chart(chartRef.current, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: pieColors.backgrounds,
          borderColor: pieColors.borders,
          borderWidth: 1
        }]
      },
      options: options
    });
    
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [tableData]);

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Doughnut Chart Visualization</h3>
        <button
          className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
          onClick={onDownload}
        >
          Download Chart
        </button>
      </div>
      <div className="bg-white p-4 rounded w-full" style={{ height: '600px' }}>
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default DoughnutChart;
