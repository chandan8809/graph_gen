import React, { useState } from 'react';
import { Activity } from 'lucide-react';
import EditableTable from './EditableTable';
import ChartDisplay from './ChartDisplay';
import BarChart from '@/charts/Basic_charts/Bar';
import DoughnutChart from '@/charts/Basic_charts/Doughnut';
import LineChart from '@/charts/Basic_charts/Line';
import PieChart from '@/charts/Basic_charts/Pie';
import PolarAreaChart from '@/charts/Basic_charts/PolarArea';
import RadarChart from '@/charts/Basic_charts/Radar';


export default function ExcelLikeTableWithChartOptions({ chartType }) {
 
  const [tableData, setTableData] = useState([
    ['', 'January', 'February', 'March', 'April', ''],
    ['2023', '65', '8', '90', '81', ''],
    ['2024', '219', '48', '40', '19', ''],
    ['', '', '', '', '', '']
  ]);
 
  const [selectedCell, setSelectedCell] = useState(null);
  const [editValue, setEditValue] = useState('');

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

  const renderChart = () => {
    switch(chartType) {
      case 'bar':
        return <BarChart tableData={tableData} onDownload={handleDownloadChart}/>;
      case 'doughnut':
        return <DoughnutChart tableData={tableData} onDownload={handleDownloadChart}/>;
      case 'line':
        return <LineChart tableData={tableData} onDownload={handleDownloadChart}/>;
      case 'pie':
        return <PieChart tableData={tableData} onDownload={handleDownloadChart}/>;
      case 'polarArea':
        return <PolarAreaChart tableData={tableData} onDownload={handleDownloadChart}/>;
      case 'radar':
        return <RadarChart tableData={tableData} onDownload={handleDownloadChart}/>;
      default:
        return <BarChart tableData={tableData} onDownload={handleDownloadChart}/>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-gray-800 overflow-hidden">
      {/* Subtle particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
       
      </div>

      {/* Header */}
      <header className="container mx-auto px-6 py-4 flex justify-between items-center relative z-10">
        <div className="flex items-center">
          <div className="bg-blue-500 rounded-lg p-2">
            <Activity className="h-8 w-8 text-white" />
          </div>
          <h1 className="ml-3 text-2xl font-bold text-blue-600">Chart Plot</h1>
        </div>
      </header>

      <div className="container mx-auto flex flex-col items-center p-4 w-full screen-lg lg:p-10">
        <EditableTable
          tableData={tableData}
          selectedCell={selectedCell}
          editValue={editValue}
          onCellClick={handleCellClick}
          onCellChange={handleCellChange}
          onEndEdit={handleEndEdit}
          onKeyPress={handleKeyPress}
        />

        {renderChart()}
      </div>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 relative z-10 border-t border-blue-100">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-6 md:mb-0">
            <div className="bg-blue-500 rounded-lg p-2">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <h2 className="ml-3 text-xl font-bold text-blue-600">Chart Plot</h2>
          </div>
          <div className="text-sm text-gray-600">
            © {new Date().getFullYear()} Chart Plot. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}