import React, { useState, useEffect } from 'react';
import { LineChart, PieChart, BarChart2, TrendingUp, Activity, AreaChart, Maximize, ChevronRight, GitBranch, Network, Database, Box, Layers, Share2, GitFork, GitCommit, Boxes } from 'lucide-react';
import { useRouter } from 'next/router';

const ChartVisualizer = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();
  
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
    { 
      type: 'bar',
      icon: <BarChart2 className="h-8 w-8" style={{color: '#FF6B6B'}}/>,
      label: 'Bar Chart',
      gradient: 'from-[#FF6B6B] to-[#FF8E8E]'
    },
    { 
      type: 'line',
      icon: <LineChart className="h-8 w-8" style={{color: '#4ECDC4'}}/>,
      label: 'Line Chart',
      gradient: 'from-[#4ECDC4] to-[#6EE7E7]'
    },
    { 
      type: 'pie',
      icon: <PieChart className="h-8 w-8" style={{color: '#FFD93D'}}/>,
      label: 'Pie Chart', 
      gradient: 'from-[#FFD93D] to-[#FFE869]'
    },
    { 
      type: 'doughnut',
      icon: <Activity className="h-8 w-8" style={{color: '#6C5CE7'}}/>,
      label: 'Doughnut Chart',
      gradient: 'from-[#6C5CE7] to-[#8F7FF7]'
    },
    { 
      type: 'polarArea',
      icon: <AreaChart className="h-8 w-8" style={{color: '#A8E6CF'}}/>,
      label: 'Polar Area',
      gradient: 'from-[#A8E6CF] to-[#DDFFD9]'
    },
    { 
      type: 'radar',
      icon: <TrendingUp className="h-8 w-8" style={{color: '#FF9A9E'}}/>,
      label: 'Radar Chart',
      gradient: 'from-[#FF9A9E] to-[#FECFEF]'
    },
  ];

  const flowTypes = [
    { 
      type: 'decisiontree',
      icon: <GitBranch className="h-8 w-8" style={{color: '#FF6B6B'}}/>,
      label: 'Decision Tree',
      gradient: 'from-[#FF6B6B] to-[#FF8E8E]'
    },
    { 
      type: 'businessprocess',
      icon: <Activity className="h-8 w-8" style={{color: '#4ECDC4'}}/>,
      label: 'Business Process',
      gradient: 'from-[#4ECDC4] to-[#6EE7E7]'
    },
    { 
      type: 'mindmap',
      icon: <GitCommit className="h-8 w-8" style={{color: '#FFD93D'}}/>,
      label: 'Mind Map', 
      gradient: 'from-[#FFD93D] to-[#FFE869]'
    },
    { 
      type: 'algoflow',
      icon: <GitFork className="h-8 w-8" style={{color: '#6C5CE7'}}/>,
      label: 'Algorithm Flow',
      gradient: 'from-[#6C5CE7] to-[#8F7FF7]'
    },
    { 
      type: 'flowchart',
      icon: <GitCommit className="h-8 w-8" style={{color: '#A8E6CF'}}/>,
      label: 'Flowchart',
      gradient: 'from-[#A8E6CF] to-[#DDFFD9]'
    },
    { 
      type: 'processmap',
      icon: <Share2 className="h-8 w-8" style={{color: '#FF9A9E'}}/>,
      label: 'Process Map',
      gradient: 'from-[#FF9A9E] to-[#FECFEF]'
    },
    { 
      type: 'swimlane',
      icon: <Layers className="h-8 w-8" style={{color: '#6C5CE7'}}/>,
      label: 'Swimlane',
      gradient: 'from-[#6C5CE7] to-[#8F7FF7]'
    },
  ];

  const diagramTypes = [
    { 
      type: 'class',
      icon: <Boxes className="h-8 w-8" style={{color: '#FF6B6B'}}/>,
      label: 'Class Diagram',
      gradient: 'from-[#FF6B6B] to-[#FF8E8E]'
    },
    { 
      type: 'object',
      icon: <Box className="h-8 w-8" style={{color: '#4ECDC4'}}/>,
      label: 'Object Diagram',
      gradient: 'from-[#4ECDC4] to-[#6EE7E7]'
    },
    { 
      type: 'usecase',
      icon: <Activity className="h-8 w-8" style={{color: '#FFD93D'}}/>,
      label: 'Use Case Diagram', 
      gradient: 'from-[#FFD93D] to-[#FFE869]'
    },
    { 
      type: 'state',
      icon: <GitBranch className="h-8 w-8" style={{color: '#6C5CE7'}}/>,
      label: 'State Diagram',
      gradient: 'from-[#6C5CE7] to-[#8F7FF7]'
    },
    { 
      type: 'deployment',
      icon: <Network className="h-8 w-8" style={{color: '#A8E6CF'}}/>,
      label: 'Deployment Diagram',
      gradient: 'from-[#A8E6CF] to-[#DDFFD9]'
    },
    { 
      type: 'activity',
      icon: <Activity className="h-8 w-8" style={{color: '#FF9A9E'}}/>,
      label: 'Activity Diagram',
      gradient: 'from-[#FF9A9E] to-[#FECFEF]'
    },
    { 
      type: 'sequence',
      icon: <GitFork className="h-8 w-8" style={{color: '#6C5CE7'}}/>,
      label: 'Sequence Diagram',
      gradient: 'from-[#6C5CE7] to-[#8F7FF7]'
    },
    { 
      type: 'component',
      icon: <Boxes className="h-8 w-8" style={{color: '#FF6B6B'}}/>,
      label: 'Component Diagram',
      gradient: 'from-[#FF6B6B] to-[#FF8E8E]'
    },
    { 
      type: 'erd',
      icon: <Database className="h-8 w-8" style={{color: '#4ECDC4'}}/>,
      label: 'Entity Relationship Diagram',
      gradient: 'from-[#4ECDC4] to-[#6EE7E7]'
    },
    { 
      type: 'database',
      icon: <Database className="h-8 w-8" style={{color: '#FFD93D'}}/>,
      label: 'Database Diagram',
      gradient: 'from-[#FFD93D] to-[#FFE869]'
    },
    { 
      type: 'network',
      icon: <Network className="h-8 w-8" style={{color: '#6C5CE7'}}/>,
      label: 'Network Diagram',
      gradient: 'from-[#6C5CE7] to-[#8F7FF7]'
    },
    { 
      type: 'dataflow',
      icon: <GitCommit className="h-8 w-8" style={{color: '#A8E6CF'}}/>,
      label: 'Data Flow Diagram',
      gradient: 'from-[#A8E6CF] to-[#DDFFD9]'
    },
    { 
      type: 'block',
      icon: <Box className="h-8 w-8" style={{color: '#FF9A9E'}}/>,
      label: 'Block Diagram',
      gradient: 'from-[#FF9A9E] to-[#FECFEF]'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EEF2FF] via-white to-[#E0E7FF] text-gray-800 overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div 
            key={i}
            className={`absolute bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full opacity-20 ${i % 2 === 0 ? 'animate-float-slow' : 'animate-float-medium'}`}
            style={{
              width: `${Math.random() * 15 + 5}px`,
              height: `${Math.random() * 15 + 5}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              filter: 'blur(1px)'
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="container mx-auto px-6 py-4 flex justify-between items-center relative z-10 backdrop-blur-sm bg-white/30">
        <div className="flex items-center">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg p-2 shadow-lg">
            <Activity className="h-8 w-8 text-white animate-pulse" />
          </div>
          <h1 className="ml-3 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Chart Plot</h1>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <button onClick={() => scrollToSection('features')} className="text-blue-600 hover:text-indigo-600 transition-all hover:scale-105 font-medium">Features</button>
          <button onClick={() => scrollToSection('steps')} className="text-blue-600 hover:text-indigo-600 transition-all hover:scale-105 font-medium">Steps</button>
          <button onClick={() => scrollToSection('chart-selection')} className="text-blue-600 hover:text-indigo-600 transition-all hover:scale-105 font-medium">Select Chart</button>
          <button onClick={() => scrollToSection('flow-selection')} className="text-blue-600 hover:text-indigo-600 transition-all hover:scale-105 font-medium">Select Flow</button>
          <button onClick={() => scrollToSection('diagram-selection')} className="text-blue-600 hover:text-indigo-600 transition-all hover:scale-105 font-medium">Select Diagram</button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className={`container mx-auto px-6 pt-20 pb-16 relative z-10 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-12">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 text-gray-900">
              Visualize Your Data With <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 animate-gradient-x">Magic</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-lg leading-relaxed">
              Transform raw numbers into stunning, interactive visualizations that bring your data to life.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => scrollToSection('chart-selection')}
                className="inline-flex items-center py-4 px-8 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 text-white text-lg font-semibold shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1 hover:scale-105 group animate-gradient-x"
              >
                Create Your Chart
                <ChevronRight className="ml-2 w-6 h-6 group-hover:ml-3 transition-all" />
              </button>
              <button 
                onClick={() => scrollToSection('flow-selection')}
                className="inline-flex items-center py-4 px-8 rounded-full bg-gradient-to-r from-green-500 via-teal-500 to-emerald-600 text-white text-lg font-semibold shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1 hover:scale-105 group"
              >
                Create Your Flow
                <ChevronRight className="ml-2 w-6 h-6 group-hover:ml-3 transition-all" />
              </button>
              <button 
                onClick={() => scrollToSection('diagram-selection')}
                className="inline-flex items-center py-4 px-8 rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-600 text-white text-lg font-semibold shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1 hover:scale-105 group"
              >
                Create Your Diagram
                <ChevronRight className="ml-2 w-6 h-6 group-hover:ml-3 transition-all" />
              </button>
            </div>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0 relative">
            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-blue-100 transform md:rotate-2 hover:rotate-0 transition duration-500 hover:scale-105">
              <div className="absolute -top-6 -left-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-4 shadow-lg">
                <PieChart className="h-8 w-8 text-white animate-spin-slow" />
              </div>
              <div className="h-64 flex items-center justify-center p-4">
                <div className="w-full h-full bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-500 rounded-xl opacity-90 flex items-center justify-center shadow-inner">
                  <svg viewBox="0 0 200 100" className="w-full h-full">
                    <path d="M0,50 Q50,10 100,50 T200,50" stroke="white" strokeWidth="4" fill="none" className="animate-dash">
                      <animate attributeName="d" dur="5s" repeatCount="indefinite"
                        values="M0,50 Q50,10 100,50 T200,50;
                                M0,50 Q50,90 100,50 T200,50;
                                M0,50 Q50,10 100,50 T200,50" />
                    </path>
                    <path d="M0,50 Q50,90 100,50 T200,50" stroke="rgba(255,255,255,0.5)" strokeWidth="4" fill="none" className="animate-dash-reverse">
                      <animate attributeName="d" dur="5s" repeatCount="indefinite"
                        values="M0,50 Q50,90 100,50 T200,50;
                                M0,50 Q50,10 100,50 T200,50;
                                M0,50 Q50,90 100,50 T200,50" />
                    </path>
                    {[0, 50, 100, 150, 200].map((x, i) => (
                      <circle key={i} cx={x} cy="50" r="4" fill="white" className="animate-pulse" />
                    ))}
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-8 -right-4 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-blue-100 transform -rotate-3 hover:rotate-0 transition duration-500 hover:scale-105">
              <div className="h-32 w-32 flex items-center justify-center">
                <div className="w-full h-full rounded-lg flex items-center justify-center animate-spin-slow">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle cx="50" cy="50" r="40" fill="rgba(99, 102, 241, 0.3)" />
                    <circle cx="50" cy="50" r="30" fill="rgba(139, 92, 246, 0.3)" />
                    <circle cx="50" cy="50" r="20" fill="rgba(168, 85, 247, 0.3)" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="container mx-auto px-6 py-16 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600">Powerful Features</span> For Data Visualization
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: <LineChart className="h-8 w-8 text-white" />, title: "Interactive Charts", desc: "Create dynamic charts that respond to user interaction for deeper data exploration.", gradient: "from-[#FF6B6B] to-[#FF8E8E]" },
            { icon: <BarChart2 className="h-8 w-8 text-white" />, title: "Multiple Chart Types", desc: "Choose from dozens of chart types to find the perfect visualization for your data.", gradient: "from-[#4ECDC4] to-[#6EE7E7]" },
            { icon: <TrendingUp className="h-8 w-8 text-white" />, title: "Real-time Updates", desc: "Connect to live data sources for visualizations that update in real-time.", gradient: "from-[#FFD93D] to-[#FFE869]" },
            { icon: <AreaChart className="h-8 w-8 text-white" />, title: "Responsive Design", desc: "Charts automatically adapt to any screen size for perfect viewing on any device.", gradient: "from-[#6C5CE7] to-[#8F7FF7]" },
            { icon: <Maximize className="h-8 w-8 text-white" />, title: "Customization", desc: "Extensive styling options to match your brand and create unique visualizations.", gradient: "from-[#A8E6CF] to-[#DDFFD9]" },
            { icon: <Activity className="h-8 w-8 text-white" />, title: "Advanced Analytics", desc: "Built-in statistical tools to extract meaningful insights from your data.", gradient: "from-[#FF9A9E] to-[#FECFEF]" }
          ].map((feature, index) => (
            <div 
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-blue-100 hover:shadow-2xl transition transform hover:-translate-y-2 group"
            >
              <div className={`bg-gradient-to-r ${feature.gradient} rounded-lg inline-block p-3 mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
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
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
          Simple <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600">Three-Step</span> Process
        </h2>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {[
            { number: "01", title: "Upload Your Data", desc: "Connect your data source or upload your dataset in CSV, JSON, or Excel format.", gradient: "from-[#FF6B6B] to-[#FF8E8E]" },
            { number: "02", title: "Choose Your Visualization", desc: "Select from our library of chart types to find the perfect visual for your data story.", gradient: "from-[#4ECDC4] to-[#6EE7E7]" },
            { number: "03", title: "Customize & Share", desc: "Personalize your chart's appearance and share it anywhere with a simple embed code.", gradient: "from-[#FFD93D] to-[#FFE869]" }
          ].map((step, index) => (
            <div key={index} className="md:w-1/3 flex flex-col items-center text-center group">
              <div className={`text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${step.gradient} mb-4 group-hover:scale-110 transition-transform`}>
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
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
          Select Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600">Chart Type</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {chartTypes.map((chart, index) => (
            <div 
              onClick={() => router.push({pathname: `/chart/${chart.type}`})}
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-blue-100 hover:shadow-2xl transition transform hover:-translate-y-2 cursor-pointer group"
            >
              <div className={`bg-gradient-to-r ${chart.gradient} rounded-lg inline-block p-3 mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                {chart.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">{chart.label}</h3>
              <p className="text-gray-600">Perfect for {chart.type === 'bar' ? 'comparing values across categories' : 
                chart.type === 'line' ? 'showing trends over time' : 
                chart.type === 'pie' ? 'showing composition of a whole' : 
                chart.type === 'doughnut' ? 'displaying proportions with emphasis on central space' : 
                chart.type === 'polarArea' ? 'comparing multiple variables' : 
                'displaying multivariate data in a circular format'}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Select Flow Section */}
      <section id="flow-selection" className="container mx-auto px-6 py-16 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
          Select Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-teal-500 to-emerald-600">Flow Type</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {flowTypes.map((flow, index) => (
            <div 
              onClick={() => router.push({pathname: `/flow_representation/${flow.type}`})}
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-green-100 hover:shadow-2xl transition transform hover:-translate-y-2 cursor-pointer group"
            >
              <div className={`bg-gradient-to-r ${flow.gradient} rounded-lg inline-block p-3 mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                {flow.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">{flow.label}</h3>
              <p className="text-gray-600">Perfect for {flow.type === 'decisiontree' ? 'showing decision-making processes' : 
                flow.type === 'businessprocess' ? 'visualizing business workflows' : 
                flow.type === 'mindmap' ? 'organizing ideas and concepts' : 
                flow.type === 'algoflow' ? 'illustrating algorithm steps' : 
                flow.type === 'flowchart' ? 'mapping processes and workflows' : 
                flow.type === 'processmap' ? 'documenting detailed processes' : 
                'showing parallel processes and responsibilities'}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Select Diagram Section */}
      <section id="diagram-selection" className="container mx-auto px-6 py-16 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
          Select Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-600">Diagram Type</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {diagramTypes.map((diagram, index) => (
            <div 
              onClick={() => router.push({pathname: `/diagram/${diagram.type}`})}
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-orange-100 hover:shadow-2xl transition transform hover:-translate-y-2 cursor-pointer group"
            >
              <div className={`bg-gradient-to-r ${diagram.gradient} rounded-lg inline-block p-3 mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                {diagram.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">{diagram.label}</h3>
              <p className="text-gray-600">Perfect for {diagram.type === 'class' ? 'modeling object-oriented systems' : 
                diagram.type === 'object' ? 'showing object relationships' : 
                diagram.type === 'usecase' ? 'capturing system requirements' : 
                diagram.type === 'state' ? 'modeling state transitions' : 
                diagram.type === 'deployment' ? 'showing system architecture' : 
                diagram.type === 'activity' ? 'modeling workflows and processes' : 
                diagram.type === 'sequence' ? 'showing object interactions over time' : 
                diagram.type === 'component' ? 'modeling system components' : 
                diagram.type === 'erd' ? 'modeling database relationships' : 
                diagram.type === 'database' ? 'designing database schemas' : 
                diagram.type === 'network' ? 'showing network topology' : 
                diagram.type === 'dataflow' ? 'modeling data movement' : 
                'showing system structure'}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 relative z-10 border-t border-blue-100">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-6 md:mb-0">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg p-2 shadow-lg">
              <Activity className="h-6 w-6 text-white animate-pulse" />
            </div>
            <h2 className="ml-3 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Chart Plot</h2>
          </div>
          <div className="text-sm text-gray-600">
            © {new Date().getFullYear()} Chart Plot. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ChartVisualizer;