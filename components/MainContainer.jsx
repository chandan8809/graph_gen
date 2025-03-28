import React, { useState, useEffect } from 'react';
import ChartSelectionPage from './ChartSelectionPage';
import EditableTable from './EditableTable';
import ChartDisplay from './ChartDisplay';

export default function ExcelLikeTableWithChartOptions() {
  const [page, setPage] = useState(1);
  const [tableData, setTableData] = useState([
    ['', 'January', 'February', 'March', 'April', ''],
    ['2023', '65', '8', '90', '81', ''],
    ['2024', '219', '48', '40', '19', ''],
    ['', '', '', '', '', '']
  ]);
  const [chartType, setChartType] = useState('bar');
  const [selectedCell, setSelectedCell] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleChartTypeChange = (type) => {
    setChartType(type);
    setPage(2);
  };

  const handleDownloadChart = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const link = document.createElement('a');
      link.download = `chart-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  const checkAndExpandTable = (newTableData) => {
    let modified = false;
    const lastRowIndex = newTableData.length - 1;
    const lastColIndex = newTableData[0].length - 1;
    
    const lastRowHasData = newTableData[lastRowIndex].some(cell => cell !== '');
    if (lastRowHasData) {
      newTableData.push(Array(newTableData[0].length).fill(''));
      modified = true;
    }
    
    const lastColHasData = newTableData.some(row => row[lastColIndex] !== '');
    if (lastColHasData) {
      newTableData = newTableData.map(row => [...row, '']);
      modified = true;
    }
    
    return modified ? newTableData : null;
  };

  const handleCellClick = (rowIndex, colIndex) => {
    setSelectedCell({ row: rowIndex, col: colIndex });
    setEditValue(tableData[rowIndex][colIndex]);
  };

  const handleCellChange = (e) => {
    setEditValue(e.target.value);
  };

  const handleEndEdit = () => {
    if (selectedCell) {
      const newData = [...tableData.map(row => [...row])];
      newData[selectedCell.row][selectedCell.col] = editValue;
      
      const expandedData = checkAndExpandTable(newData);
      
      setTableData(expandedData || newData);
      setSelectedCell(null);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEndEdit();
    }
  };

  const handleBack = () => {
    setPage(1);
  };

  if (page === 1) {
    return <ChartSelectionPage onChartTypeChange={handleChartTypeChange} />;
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
      
      <EditableTable
        tableData={tableData}
        selectedCell={selectedCell}
        editValue={editValue}
        onCellClick={handleCellClick}
        onCellChange={handleCellChange}
        onEndEdit={handleEndEdit}
        onKeyPress={handleKeyPress}
      />

      <ChartDisplay
        chartType={chartType}
        tableData={tableData}
        onDownload={handleDownloadChart}
      />
    </div>
  );
}