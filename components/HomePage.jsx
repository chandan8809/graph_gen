import React, { useState, useEffect } from 'react';
import { LineChart, PieChart, BarChart2, TrendingUp, Activity, AreaChart, Maximize, ChevronRight } from 'lucide-react';

const ChartVisualizer = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const chartTypes = [
    { type: 'bar', icon: <BarChart2 className="h-8 w-8" />, label: 'Bar Chart' },
    { type: 'line', icon: <LineChart className="h-8 w-8" />, label: 'Line Chart' },
    { type: 'pie', icon: <PieChart className="h-8 w-8" />, label: 'Pie Chart' },
    { type: 'doughnut', icon: <Activity className="h-8 w-8" />, label: 'Doughnut Chart' },
    { type: 'polarArea', icon: <AreaChart className="h-8 w-8" />, label: 'Polar Area' },
    { type: 'radar', icon: <TrendingUp className="h-8 w-8" />, label: 'Radar Chart' },
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-gray-800 overflow-hidden">
      {/* Subtle particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i}
            className={`absolute bg-blue-200 bg-opacity-30 rounded-full ${i % 2 === 0 ? 'animate-float-slow' : 'animate-float-medium'}`}
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="container mx-auto px-6 py-4 flex justify-between items-center relative z-10">
        <div className="flex items-center">
          <div className="bg-blue-500 rounded-lg p-2">
            <Activity className="h-8 w-8 text-white" />
          </div>
          <h1 className="ml-3 text-2xl font-bold text-blue-600">ChartCraft</h1>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <button onClick={() => scrollToSection('features')} className="text-blue-600 hover:text-blue-800 transition">Features</button>
          <button onClick={() => scrollToSection('steps')} className="text-blue-600 hover:text-blue-800 transition">Steps</button>
          <button onClick={() => scrollToSection('chart-selection')} className="text-blue-600 hover:text-blue-800 transition">Select Chart</button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className={`container mx-auto px-6 pt-20 pb-16 relative z-10 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-12">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-gray-900">
              Visualize Your Data Like <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">Never Before</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-lg">
              Transform raw numbers into stunning, interactive visualizations that tell your data's story.
            </p>
            <a 
                onClick={() => scrollToSection('chart-selection')}
              className="inline-flex items-center py-3 px-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-lg font-semibold shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 group"
            >
              Create Your Chart
              <ChevronRight className="ml-2 w-5 h-5 group-hover:ml-3 transition-all" />
            </a>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0 relative">
            <div className="relative bg-white rounded-3xl p-6 shadow-xl border border-blue-100 transform md:rotate-1 hover:rotate-0 transition duration-500">
              <div className="absolute -top-4 -left-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full p-3">
                <PieChart className="h-6 w-6 text-white" />
              </div>
              <div className="h-64 flex items-center justify-center p-4">
                <div className="w-full h-full bg-gradient-to-r from-blue-400 to-indigo-500 rounded-xl opacity-80 flex items-center justify-center">
                  <svg viewBox="0 0 200 100" className="w-full h-full">
                    <path d="M0,50 Q50,10 100,50 T200,50" stroke="white" strokeWidth="3" fill="none" />
                    <path d="M0,50 Q50,90 100,50 T200,50" stroke="rgba(255,255,255,0.5)" strokeWidth="3" fill="none" />
                    <circle cx="0" cy="50" r="3" fill="white" />
                    <circle cx="50" cy="10" r="3" fill="white" />
                    <circle cx="100" cy="50" r="3" fill="white" />
                    <circle cx="150" cy="90" r="3" fill="white" />
                    <circle cx="200" cy="50" r="3" fill="white" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-2 bg-white rounded-2xl p-4 shadow-lg border border-blue-100 transform -rotate-3 hover:rotate-0 transition duration-500">
              <div className="h-32 w-32 flex items-center justify-center">
                <div className="w-full h-full rounded-lg flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle cx="50" cy="50" r="40" fill="rgba(79, 70, 229, 0.2)" />
                    <circle cx="50" cy="50" r="30" fill="rgba(59, 130, 246, 0.2)" />
                    <circle cx="50" cy="50" r="20" fill="rgba(99, 102, 241, 0.2)" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="container mx-auto px-6 py-16 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">Powerful Features</span> For Data Visualization
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: <LineChart className="h-8 w-8 text-white" />, title: "Interactive Charts", desc: "Create dynamic charts that respond to user interaction for deeper data exploration." },
            { icon: <BarChart2 className="h-8 w-8 text-white" />, title: "Multiple Chart Types", desc: "Choose from dozens of chart types to find the perfect visualization for your data." },
            { icon: <TrendingUp className="h-8 w-8 text-white" />, title: "Real-time Updates", desc: "Connect to live data sources for visualizations that update in real-time." },
            { icon: <AreaChart className="h-8 w-8 text-white" />, title: "Responsive Design", desc: "Charts automatically adapt to any screen size for perfect viewing on any device." },
            { icon: <Maximize className="h-8 w-8 text-white" />, title: "Customization", desc: "Extensive styling options to match your brand and create unique visualizations." },
            { icon: <Activity className="h-8 w-8 text-white" />, title: "Advanced Analytics", desc: "Built-in statistical tools to extract meaningful insights from your data." }
          ].map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg inline-block p-3 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* steps */}
      <section id="steps" className="container mx-auto px-6 py-16 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900">
          Simple <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">Three-Step</span> Process
        </h2>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {[
            { number: "01", title: "Upload Your Data", desc: "Connect your data source or upload your dataset in CSV, JSON, or Excel format." },
            { number: "02", title: "Choose Your Visualization", desc: "Select from our library of chart types to find the perfect visual for your data story." },
            { number: "03", title: "Customize & Share", desc: "Personalize your chart's appearance and share it anywhere with a simple embed code." }
          ].map((step, index) => (
            <div key={index} className="md:w-1/3 flex flex-col items-center text-center">
              <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 mb-4">
                {step.number}
              </div>
              <h3 className="text-2xl font-bold mb-2 text-gray-800">{step.title}</h3>
              <p className="text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Select Chart Section */}
      <section id="chart-selection" className="container mx-auto px-6 py-16 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900">
          Select Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">Chart Type</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {chartTypes.map((chart, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition transform hover:-translate-y-1 cursor-pointer"
            >
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg inline-block p-3 mb-4">
                {chart.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">{chart.label}</h3>
              <p className="text-gray-600">Perfect for {chart.type === 'bar' ? 'comparing values across categories' : 
                chart.type === 'line' ? 'showing trends over time' : 
                chart.type === 'pie' ? 'showing composition of a whole' : 
                chart.type === 'doughnut' ? 'displaying proportions with emphasis on central space' : 
                chart.type === 'polarArea' ? 'comparing multiple variables' : 
                'displaying multivariate data in a circular format'}</p>
              <button className="mt-4 inline-flex items-center py-2 px-4 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-semibold shadow-md hover:shadow-lg transition transform hover:-translate-y-1 group">
                Select
                <ChevronRight className="ml-1 w-4 h-4 group-hover:ml-2 transition-all" />
              </button>
            </div>
          ))}
        </div>
      </section>

     

      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 relative z-10 border-t border-blue-100">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-6 md:mb-0">
            <div className="bg-blue-500 rounded-lg p-2">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <h2 className="ml-3 text-xl font-bold text-blue-600">ChartCraft</h2>
          </div>
          <div className="text-sm text-gray-600">
            © {new Date().getFullYear()} ChartCraft. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ChartVisualizer;