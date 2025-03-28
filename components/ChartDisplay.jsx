import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ChartDisplay = ({ chartType, tableData, onDownload }) => {
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
    const singleRowData = [];
    
    // Get first row data for single dataset charts
    for (let j = 1; j < tableData[0].length - 1; j++) {
      if (tableData[0][j] !== '') {
        const value = parseFloat(tableData[1][j]) || 0;
        singleRowData.push(value);
      }
    }

    // Configure datasets based on chart type
    if (['pie', 'doughnut', 'polarArea', 'radar'].includes(chartType)) {
      datasets.push({
        data: singleRowData,
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 206, 86)',
          'rgb(75, 192, 192)'
        ],
        borderWidth: 1
      });
    } else {
      // For other chart types, use multiple datasets
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
            backgroundColor: i === 1 ? 'rgba(54, 162, 235, 0.5)' : 'rgba(255, 99, 132, 0.5)',
            borderColor: i === 1 ? 'rgb(54, 162, 235)' : 'rgb(255, 99, 132)',
            borderWidth: ['line', 'radar'].includes(chartType) ? 2 : 1,
            tension: ['line', 'radar'].includes(chartType) ? 0.1 : 0,
            fill: ['line', 'radar'].includes(chartType) ? false : true
          });
        }
      }
    }
    
    const options = {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: `Data Visualization (${chartType.charAt(0).toUpperCase() + chartType.slice(1)} Chart)`
        },
        legend: {
          position: 'top',
        }
      }
    };

    if (!['pie', 'doughnut', 'polarArea'].includes(chartType)) {
      options.scales = {
        y: {
          beginAtZero: true
        }
      };
    }

    chartInstance.current = new Chart(chartRef.current, {
      type: chartType,
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
  }, [tableData, chartType]);

  return (
    <div className="w-full mb-8 border border-gray-300">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Chart Visualization</h3>
        <button
          className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
          onClick={onDownload}
        >
          Download Chart
        </button>
      </div>
      <div className="bg-white p-4 rounded shadow w-full" style={{ height: '600px' }}>
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default ChartDisplay;