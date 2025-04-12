import React, { useEffect, useRef } from 'react';

const ContourPlot = () => {
  const chartRef = useRef(null);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!chartRef.current) return;
    
    // Dynamically import Plotly only on client-side
    import('plotly.js-dist').then(Plotly => {
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
      
      try {
        Plotly.newPlot(chartRef.current, data, layout, {responsive: true});
      } catch (error) {
        console.error('Error plotting chart:', error);
      }
    });
  }, []);
  
  return <div className="w-full h-[500px]" ref={chartRef}></div>;
};

export default ContourPlot;
