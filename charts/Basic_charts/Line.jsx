import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { colors } from '../common/ColorPalettes';

const LineChart = ({ tableData, onDownload }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;
    
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    
    // Prepare data for the chart
    const labels = tableData[0].slice(1, -1).filter(label => label !== '');
    
    const datasets = [];
    
    // For line charts, use multiple datasets
    let colorIndex = 0;
    for (let i = 1; i < tableData.length - 1; i++) {
      const rowLabel = tableData[i][0];
      if (rowLabel) {
        const data = [];
        for (let j = 1; j < tableData[0].length - 1; j++) {
          if (tableData[0][j] !== '') {
            const value = parseFloat(tableData[i][j]) || 0;
            data.push(value);
          }
        }
        
        datasets.push({
          label: rowLabel,
          data: data,
          backgroundColor: colors[colorIndex % colors.length].bg,
          borderColor: colors[colorIndex % colors.length].border,
          borderWidth: 2,
          tension: 0.1,
          fill: false
        });
        colorIndex++;
      }
    }
    
    const options = {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Data Visualization (Line Chart)'
        },
        legend: {
          position: 'top',
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };

    chartInstance.current = new Chart(chartRef.current, {
      type: 'line',
      data: {
        labels: labels,
        datasets: datasets
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
        <h3 className="font-semibold">Line Chart Visualization</h3>
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

export default LineChart;
