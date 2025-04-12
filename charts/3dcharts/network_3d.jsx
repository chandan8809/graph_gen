import React, { useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist';

const NetworkGraph = () => {
  const chartRef = useRef(null);
  
  useEffect(() => {
    if (!chartRef.current) return;
    
    const data = [{
      type: 'scatter3d',
      x: [0, 1, 2, 3, 4],
      y: [0, 1, 2, 3, 4],
      z: [0, 1, 2, 3, 4],
      mode: 'markers+lines',
      marker: {
        size: 8,
        color: 'rgb(127, 127, 127)'
      },
      line: {
        color: 'rgb(127, 127, 127)',
        width: 2
      }
    }];
    
    const layout = {
      title: '3D Network Graph',
      autosize: true,
      height: 500
    };
    
    Plotly.newPlot(chartRef.current, data, layout, {responsive: true});
  }, []);
  
  return <div className="w-full h-[500px]" ref={chartRef}></div>;
};

export default NetworkGraph;
