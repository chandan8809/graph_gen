import React, { useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist';

const ScatterPlot = () => {
  const chartRef = useRef(null);
  
  useEffect(() => {
    if (!chartRef.current) return;
    
    const data = [{
      type: 'scatter3d',
      x: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      y: [2, 3, 4, 5, 6, 7, 8, 9, 10],
      z: [3, 5, 7, 9, 11, 13, 15, 17, 19],
      mode: 'markers',
      marker: {
        size: 8,
        color: 'rgba(0, 128, 255, 0.8)'
      }
    }];
    
    const layout = {
      title: 'Scatter Plot (Example)',
      scene: {
        xaxis: { title: 'X Axis' },
        yaxis: { title: 'Y Axis' },
        zaxis: { title: 'Z Axis' }
      },
      autosize: true,
      margin: {
        l: 0,
        r: 0,
        b: 0,
        t: 50,
        pad: 4
      },
      height: 500
    };
    
    Plotly.newPlot(chartRef.current, data, layout, {responsive: true});
  }, []);
  
  return (
    <div>
      <div className="w-full h-[500px]" ref={chartRef}></div>
    </div>
  );
};

export default ScatterPlot;
