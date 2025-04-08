import React, { useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist';

const ContourPlot = () => {
  const chartRef = useRef(null);
  
  useEffect(() => {
    if (!chartRef.current) return;
    
    const z = [
      [2, 4, 6, 8, 10],
      [1, 3, 5, 7, 9],
      [10, 8, 6, 4, 2],
      [9, 7, 5, 3, 1]
    ];
    
    const data = [{
      type: 'surface',
      z: z,
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
    
    Plotly.newPlot(chartRef.current, data, layout, {responsive: true});
  }, []);
  
  return <div className="w-full h-[500px]" ref={chartRef}></div>;
};

export default ContourPlot;
