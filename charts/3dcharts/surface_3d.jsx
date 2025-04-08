import React, { useEffect, useRef, useState } from 'react';
import Plotly from 'plotly.js-dist';

const SurfacePlot = () => {
  const chartRef = useRef(null);
  
  useEffect(() => {
    if (!chartRef.current) return;
    
    const data = [{
      type: 'surface',
      z: [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, 16]
      ],
      colorscale: 'Viridis'
    }];
    
    const layout = {
      title: 'Surface Plot (Example)',
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

export default SurfacePlot;
