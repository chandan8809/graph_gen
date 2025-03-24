import { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function ExcelLikeTableWithChartOptions() {
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

  // Handle chart type change
  const handleChartTypeChange = (type) => {
    setChartType(type);
  };

  // Handle chart download
  const handleDownloadChart = () => {
    if (chartRef.current) {
      const link = document.createElement('a');
      link.download = `chart-${Date.now()}.png`;
      link.href = chartRef.current.toDataURL('image/png');
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
          borderWidth: chartType === 'line' ? 2 : 1,
          tension: chartType === 'line' ? 0.1 : 0, // Slight curve for line charts
          fill: chartType === 'line' ? false : true
        });
      }
    }
    
    // Create new chart
    chartInstance.current = new Chart(chartRef.current, {
      type: chartType,
      data: {
        labels: labels,
        datasets: datasets
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: `Data Visualization (${chartType.charAt(0).toUpperCase() + chartType.slice(1)} Chart)`
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
      }
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

  return (
    <div className="flex flex-col items-center p-4 w-full">
      <h2 className="text-xl font-bold mb-4">Excel-like Table with Chart</h2>
      
      <div className="w-full overflow-x-auto mb-8">
        <table className="border-collapse w-full">
          <tbody>
            {tableData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <td 
                    key={colIndex}
                    className={`border border-gray-300 p-2 h-10 min-w-16 ${
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
                        className="w-full h-full border-none p-0 focus:outline-none"
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
          <div className="flex space-x-2">
            <button 
              className={`px-4 py-2 rounded ${chartType === 'bar' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 hover:bg-gray-300'}`}
              onClick={() => handleChartTypeChange('bar')}
            >
              Bar Chart
            </button>
            <button 
              className={`px-4 py-2 rounded ${chartType === 'line' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 hover:bg-gray-300'}`}
              onClick={() => handleChartTypeChange('line')}
            >
              Line Chart
            </button>
            <button
              className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
              onClick={handleDownloadChart}
            >
              Download Chart
            </button>
          </div>
        </div>
        <div className="bg-white p-4 rounded shadow w-full" style={{ height: '400px' }}>
          <canvas ref={chartRef}></canvas>
        </div>
      </div>
      
      {/* <div className="text-left w-full">
        <h3 className="font-semibold mb-2">Current JSON Data:</h3>
        <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
          {JSON.stringify(jsonData, null, 2)}
        </pre>
      </div> */}
    </div>
  );
}