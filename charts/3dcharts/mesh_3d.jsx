import React, { useEffect, useRef } from 'react';

const MeshPlot = () => {
  const chartRef = useRef(null);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!chartRef.current) return;
    
    // Dynamically import Plotly only on client-side
    import('plotly.js-dist').then(Plotly => {
      const data = [{
        type: 'mesh3d',
        x: [0, 1, 2, 0, 1, 2, 0, 1, 2],
        y: [0, 0, 0, 1, 1, 1, 2, 2, 2],
        z: [0, 1, 0, 1, 2, 1, 0, 1, 0],
        intensity: [0, 0.5, 1, 0.5, 1, 0.5, 1, 0.5, 0],
        colorscale: 'Viridis'
      }];
      
      const layout = {
        title: 'Mesh Plot (Example)',
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
    });
  }, []);
  
  return (
    <div>
      <div className="w-full h-[500px]" ref={chartRef}></div>
    </div>
  );
};

export default MeshPlot;
