import React from 'react';
import { motion } from 'framer-motion';

const ChartSelectionPage = ({ onChartTypeChange }) => {
  const chartTypes = [
    { type: 'bar', icon: '📊', label: 'Bar Chart' },
    { type: 'line', icon: '📈', label: 'Line Chart' },
    { type: 'pie', icon: '🥧', label: 'Pie Chart' },
    { type: 'doughnut', icon: '🍩', label: 'Doughnut Chart' },
    { type: 'polarArea', icon: '🎯', label: 'Polar Area' },
    { type: 'radar', icon: '📡', label: 'Radar Chart' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center p-4 w-full min-h-screen"
    >
      <motion.h2
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        className="text-2xl font-bold mb-8"
      >
        Select Chart Type
      </motion.h2>
      <div className="grid grid-cols-3 gap-8">
        {chartTypes.map(({ type, icon, label }) => (
          <motion.button
            key={type}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
            className="p-8 rounded-lg shadow-lg bg-white hover:bg-blue-50 border-2 border-blue-500 transition-all"
            onClick={() => onChartTypeChange(type)}
          >
            <motion.div 
              className="text-6xl mb-4"
              whileHover={{ 
                rotate: 10,
                scale: 1.2,
                transition: { duration: 0.5 }
              }}
            >
              {icon}
            </motion.div>
            <motion.div 
              className="text-xl font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {label}
            </motion.div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default ChartSelectionPage;