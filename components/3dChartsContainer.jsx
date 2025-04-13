import React from 'react';
import BarChart from '../charts/3dcharts/bar_3d';
import ContourPlot from '../charts/3dcharts/contour_3d';
import MeshPlot from '../charts/3dcharts/mesh_3d';
import NetworkGraph from '../charts/3dcharts/network_3d';
import ScatterPlot from '../charts/3dcharts/scatter_3d';
import SurfacePlot from '../charts/3dcharts/surface_3d';

// Create a simple wrapper component
const ThreeDChartsContainer = ({ chartType }) => {
  // Function to render the appropriate chart
  const renderChart = () => {
    switch(chartType) {
      case 'bar':
        return <BarChart />;
      case 'contour':
        return <ContourPlot />;
      case 'mesh':
        return <MeshPlot />;
      case 'network':
        return <NetworkGraph />;
      case 'scatter':
        return <ScatterPlot />;
      case 'surface':
        return <SurfacePlot />;
      default:
        return <div>Select a chart type</div>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        3D {chartType.charAt(0).toUpperCase() + chartType.slice(1)} Chart
      </h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        {renderChart()}
      </div>
    </div>
  );
};

export default ThreeDChartsContainer;
