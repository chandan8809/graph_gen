import React from 'react';
import { Cube } from 'lucide-react';
// Replace dynamic import with direct import
import BarChartComponent from '../charts/3dcharts/bar_3d';

// Create a simple wrapper component
const ThreeDChartsContainer = ({ chartType }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Cube className="mr-2" />
        3D Bar Chart
      </h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <BarChartComponent />
      </div>
    </div>
  );
};

export default ThreeDChartsContainer;
