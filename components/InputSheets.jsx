import { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function ExcelLikeTableWithChartOptions() {
  const [page, setPage] = useState(1);
  // Initial table data from the image with one extra empty row and column
  const [tableData, setTableData] = useState([
    ['', 'January', 'February', 'March', 'April', ''],
    ['2023', '65', '8', '90', '81', ''],
    ['2024', '219', '48', '40', '19', ''],
    ['', '', '', '', '', '']
  ]);

  // Store data in JSON format
  const [jsonData, setJsonData] = useState({});
  
  // Chart reference and state
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [chartType, setChartType] = useState('bar');

  const [selectedCell, setSelectedCell] = useState(null);
  const [editValue, setEditValue] = useState('');

  // Handle chart type change and move to next page
  const handleChartTypeChange = (type) => {
    setChartType(type);
    setPage(2);
  };

  // Handle chart download
  const handleDownloadChart = () => {
    if (chartRef.current) {
      // Create a temporary canvas to draw white background
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      const originalCanvas = chartRef.current;
      
      // Set dimensions
      tempCanvas.width = originalCanvas.width;
      tempCanvas.height = originalCanvas.height;
      
      // Fill white background
      tempCtx.fillStyle = 'white';
      tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
      
      // Draw original chart on top
      tempCtx.drawImage(originalCanvas, 0, 0);
      
      // Create download link with white background version
      const link = document.createElement('a');
      link.download = `chart-${Date.now()}.png`;
      link.href = tempCanvas.toDataURL('image/png');
      link.click();
    }
  };

  // Update JSON data whenever tableData changes
  useEffect(() => {
    const headers = tableData[0].slice(1, -1);
    const json = {};
    
    for (let i = 1; i < tableData.length - 1; i++) {
      const rowLabel = tableData[i][0];
      if (rowLabel) {
        json[rowLabel] = {};
        for (let j = 1; j < tableData[0].length - 1; j++) {
          if (headers[j-1]) {
            json[rowLabel][headers[j-1]] = tableData[i][j];
          }
        }
      }
    }
    
    setJsonData(json);
  }, [tableData]);

  // Color palette for different rows
  const colors = [
    { bg: 'rgba(54, 162, 235, 0.5)', border: 'rgb(54, 162, 235)' },
    { bg: 'rgba(255, 99, 132, 0.5)', border: 'rgb(255, 99, 132)' },
    { bg: 'rgba(75, 192, 192, 0.5)', border: 'rgb(75, 192, 192)' },
    { bg: 'rgba(255, 206, 86, 0.5)', border: 'rgb(255, 206, 86)' },
    { bg: 'rgba(153, 102, 255, 0.5)', border: 'rgb(153, 102, 255)' },
    { bg: 'rgba(255, 159, 64, 0.5)', border: 'rgb(255, 159, 64)' }
  ];

  // Update chart when data changes or chart type changes
  useEffect(() => {
    if (!chartRef.current) return;
    
    // Destroy previous chart instance if it exists
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
            borderWidth: ['line', 'radar'].includes(chartType) ? 2 : 1,
            tension: ['line', 'radar'].includes(chartType) ? 0.1 : 0,
            fill: ['line', 'radar'].includes(chartType) ? false : true
          });
          colorIndex++;
        }
      }
    }
    
    // Create new chart with type-specific options
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

    // Add specific options based on chart type
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
  }, [jsonData, chartType]);

  // Check if we need to add a new row or column
  const checkAndExpandTable = (newTableData) => {
    let modified = false;
    const lastRowIndex = newTableData.length - 1;
    const lastColIndex = newTableData[0].length - 1;
    
    // Check if any cell in the last row has data
    const lastRowHasData = newTableData[lastRowIndex].some(cell => cell !== '');
    if (lastRowHasData) {
      // Add a new empty row
      newTableData.push(Array(newTableData[0].length).fill(''));
      modified = true;
    }
    
    // Check if any cell in the last column has data
    const lastColHasData = newTableData.some(row => row[lastColIndex] !== '');
    if (lastColHasData) {
      // Add a new empty column
      newTableData = newTableData.map(row => [...row, '']);
      modified = true;
    }
    
    return modified ? newTableData : null;
  };

  // Handle cell click for editing
  const handleCellClick = (rowIndex, colIndex) => {
    setSelectedCell({ row: rowIndex, col: colIndex });
    setEditValue(tableData[rowIndex][colIndex]);
  };

  // Handle cell value change
  const handleCellChange = (e) => {
    setEditValue(e.target.value);
  };

  // Handle ending edit (on blur or enter)
  const handleEndEdit = () => {
    if (selectedCell) {
      const newData = [...tableData.map(row => [...row])];
      newData[selectedCell.row][selectedCell.col] = editValue;
      
      // Check if we need to expand the table
      const expandedData = checkAndExpandTable(newData);
      
      setTableData(expandedData || newData);
      setSelectedCell(null);
    }
  };

  // Handle key press (for Enter key to end editing)
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEndEdit();
    }
  };

  // Handle going back to chart selection
  const handleBack = () => {
    setPage(1);
  };

  if (page === 1) {
    return (
      <div className="flex flex-col items-center p-4 w-full min-h-screen">
        <h2 className="text-2xl font-bold mb-8">Select Chart Type</h2>
        <div className="grid grid-cols-3 gap-8">
          <button 
            className="p-8 rounded-lg shadow-lg bg-white hover:bg-blue-50 border-2 border-blue-500 transition-all"
            onClick={() => handleChartTypeChange('bar')}
          >
            <div className="text-6xl mb-4">📊</div>
            <div className="text-xl font-semibold">Bar Chart</div>
          </button>
          <button 
            className="p-8 rounded-lg shadow-lg bg-white hover:bg-blue-50 border-2 border-blue-500 transition-all"
            onClick={() => handleChartTypeChange('line')}
          >
            <div className="text-6xl mb-4">📈</div>
            <div className="text-xl font-semibold">Line Chart</div>
          </button>
          <button 
            className="p-8 rounded-lg shadow-lg bg-white hover:bg-blue-50 border-2 border-blue-500 transition-all"
            onClick={() => handleChartTypeChange('pie')}
          >
            <div className="text-6xl mb-4">🥧</div>
            <div className="text-xl font-semibold">Pie Chart</div>
          </button>
          <button 
            className="p-8 rounded-lg shadow-lg bg-white hover:bg-blue-50 border-2 border-blue-500 transition-all"
            onClick={() => handleChartTypeChange('doughnut')}
          >
            <div className="text-6xl mb-4">🍩</div>
            <div className="text-xl font-semibold">Doughnut Chart</div>
          </button>
          <button 
            className="p-8 rounded-lg shadow-lg bg-white hover:bg-blue-50 border-2 border-blue-500 transition-all"
            onClick={() => handleChartTypeChange('polarArea')}
          >
            <div className="text-6xl mb-4">🎯</div>
            <div className="text-xl font-semibold">Polar Area</div>
          </button>
          <button 
            className="p-8 rounded-lg shadow-lg bg-white hover:bg-blue-50 border-2 border-blue-500 transition-all"
            onClick={() => handleChartTypeChange('radar')}
          >
            <div className="text-6xl mb-4">📡</div>
            <div className="text-xl font-semibold">Radar Chart</div>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-4 w-full">
      <div className="w-full flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Excel-like Table with Chart</h2>
        <button 
          onClick={handleBack}
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
        >
          Change Chart Type
        </button>
      </div>
      
      <div className="w-full overflow-x-auto mb-8">
        <table className="border-collapse w-full">
          <tbody>
            {tableData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <td 
                    key={colIndex}
                    className={`border ${
                      selectedCell?.row === rowIndex && selectedCell?.col === colIndex
                        ? 'border-blue-500 border-2'
                        : 'border-gray-300'
                    } p-1 h-10 w-32 ${
                      rowIndex === 0 || colIndex === 0 
                        ? 'bg-gray-100 font-medium' 
                        : 'bg-white'
                    }`}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                  >
                    {selectedCell && 
                     selectedCell.row === rowIndex && 
                     selectedCell.col === colIndex ? (
                      <input
                        type="text"
                        value={editValue}
                        onChange={handleCellChange}
                        onBlur={handleEndEdit}
                        onKeyPress={handleKeyPress}
                        className="w-full h-full border-none p-0 focus:outline-none bg-transparent"
                        autoFocus
                      />
                    ) : (
                      cell
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="w-full mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Chart Visualization</h3>
          <button
            className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
            onClick={handleDownloadChart}
          >
            Download Chart
          </button>
        </div>
        <div className="bg-white p-4 rounded shadow w-full" style={{ height: '600px' }}>
          <canvas ref={chartRef}></canvas>
        </div>
      </div>
    </div>
  );
}