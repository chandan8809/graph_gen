import React, { useEffect, useRef, useState } from 'react';

const ContourPlot = () => {
  const chartRef = useRef(null);
  const [plotData, setPlotData] = useState([
    [2, 4, 6, 8, 10],
    [1, 3, 5, 7, 9],
    [10, 8, 6, 4, 2],
    [9, 7, 5, 3, 1]
  ]);
  const [rows, setRows] = useState(4);
  const [cols, setCols] = useState(5);
  
  const updatePlot = () => {
    if (typeof window === 'undefined') return;
    if (!chartRef.current) return;
    
    import('plotly.js-dist').then(Plotly => {
      const data = [{
        type: 'surface',
        z: plotData,
        contours: {
          z: {
            show: true,
            usecolormap: true,
            highlightcolor: "#42f462",
            project: {z: true}
          }
        }
      }];
      
      const layout = {
        title: '3D Contour Plot',
        autosize: true,
        height: 500
      };
      
      try {
        Plotly.newPlot(chartRef.current, data, layout, {responsive: true});
      } catch (error) {
        console.error('Error plotting chart:', error);
      }
    });
  };
  
  useEffect(() => {
    updatePlot();
  }, [plotData]);
  
  const handleDataChange = (rowIndex, colIndex, value) => {
    const newData = [...plotData];
    newData[rowIndex][colIndex] = Number(value);
    setPlotData(newData);
  };
  
  const handleRowsChange = (e) => {
    const newRows = parseInt(e.target.value);
    if (newRows > 0) {
      setRows(newRows);
      
      // Create new data array with the updated number of rows
      const newData = Array(newRows).fill(0).map((_, rowIndex) => {
        if (rowIndex < plotData.length) {
          return [...plotData[rowIndex]];
        } else {
          return Array(cols).fill(0);
        }
      });
      
      setPlotData(newData);
    }
  };
  
  const handleColsChange = (e) => {
    const newCols = parseInt(e.target.value);
    if (newCols > 0) {
      setCols(newCols);
      
      // Create new data array with the updated number of columns
      const newData = plotData.map(row => {
        const newRow = Array(newCols).fill(0);
        for (let i = 0; i < Math.min(row.length, newCols); i++) {
          newRow[i] = row[i];
        }
        return newRow;
      });
      
      setPlotData(newData);
    }
  };
  
  return (
    <div>
      <div className="mb-6">
        <div className="flex gap-4 mb-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Rows:</label>
            <input 
              type="number" 
              value={rows} 
              onChange={handleRowsChange} 
              min="1" 
              max="10"
              className="border rounded px-2 py-1 w-20"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Columns:</label>
            <input 
              type="number" 
              value={cols} 
              onChange={handleColsChange} 
              min="1" 
              max="10"
              className="border rounded px-2 py-1 w-20"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="border-collapse border">
            <tbody>
              {plotData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, colIndex) => (
                    <td key={colIndex} className="border p-1">
                      <input
                        type="number"
                        value={cell}
                        onChange={(e) => handleDataChange(rowIndex, colIndex, e.target.value)}
                        className="w-16 p-1 border rounded"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="w-full h-[500px] border border-gray-500" ref={chartRef}></div>
    </div>
  );
};

export default ContourPlot;
