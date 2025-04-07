import React from 'react';
import dynamic from 'next/dynamic';
import { GitBranch } from 'lucide-react';

// Import all flow representation components with SSR disabled
const DecisionTree = dynamic(() => import('../charts/Flow_representation/decisiontree'), { ssr: false });
const BusinessProcess = dynamic(() => import('../charts/Flow_representation/businessprocess'), { ssr: false });
const MindMap = dynamic(() => import('../charts/Flow_representation/mindmap'), { ssr: false });
const AlgoFlow = dynamic(() => import('../charts/Flow_representation/algoflow'), { ssr: false });
const Flowchart = dynamic(() => import('../charts/Flow_representation/flowchart'), { ssr: false });
const ProcessMap = dynamic(() => import('../charts/Flow_representation/processmap'), { ssr: false });
const Swimlane = dynamic(() => import('../charts/Flow_representation/swimlane'), { ssr: false });

const FlowRepresentationContainer = ({ flowType }) => {
  // Decide which flow representation to show based on flowType parameter, if provided
  const renderFlowByType = () => {
    if (flowType) {
      switch (flowType) {
        case 'decisiontree':
          return <DecisionTree />;
        case 'businessprocess':
          return <BusinessProcess />;
        case 'mindmap':
          return <MindMap />;
        case 'algoflow':
          return <AlgoFlow />;
        case 'flowchart':
          return <Flowchart />;
        case 'processmap':
          return <ProcessMap />;
        case 'swimlane':
          return <Swimlane />;
        default:
          return null;
      }
    }
    return null;
  };

  // If a specific flow type is requested, only show that one
  if (flowType) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 flex items-center">
          <GitBranch className="mr-2" />
          {flowType.charAt(0).toUpperCase() + flowType.slice(1)} Flow Editor
        </h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          {renderFlowByType()}
        </div>
      </div>
    );
  }

  // Otherwise show all flow representations
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <GitBranch className="mr-2" />
        Flow Representation Editor
      </h1>
      
      <div className="space-y-16">
        <section id="decision-tree">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Decision Tree</h2>
            <DecisionTree />
          </div>
        </section>
        
        <section id="business-process">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Business Process</h2>
            <BusinessProcess />
          </div>
        </section>
        
        <section id="mind-map">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Mind Map</h2>
            <MindMap />
          </div>
        </section>

        <section id="algo-flow">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Algorithm Flow</h2>
            <AlgoFlow />
          </div>
        </section>

        <section id="flowchart">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Flowchart</h2>
            <Flowchart />
          </div>
        </section>

        <section id="process-map">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Process Map</h2>
            <ProcessMap />
          </div>
        </section>

        <section id="swimlane">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Swimlane Diagram</h2>
            <Swimlane />
          </div>
        </section>
      </div>
      
      <div className="mt-12 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">About Flow Representations</h2>
        <p className="mb-4">
          Flow representations help visualize processes, decisions, and hierarchical information in a structured manner,
          making complex systems easier to understand and communicate.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-medium mb-2">Decision Trees</h3>
            <p className="text-gray-600">Visualization for decision points and outcomes, mapping possible choices and their consequences.</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-medium mb-2">Business Process Models</h3>
            <p className="text-gray-600">Standard business process modeling notation showing workflows, activities, and operational procedures.</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-medium mb-2">Mind Maps</h3>
            <p className="text-gray-600">Organizes hierarchical information around a central concept, showing relationships between ideas.</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-medium mb-2">Algorithm Flows</h3>
            <p className="text-gray-600">Represents programming logic steps and computational processes in a visual format.</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-medium mb-2">Flowcharts</h3>
            <p className="text-gray-600">General purpose flow representation showing process steps, decisions, and pathways.</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-medium mb-2">Process Maps</h3>
            <p className="text-gray-600">Shows detailed business processes with emphasis on departmental boundaries and handoffs.</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-medium mb-2">Swimlane Diagrams</h3>
            <p className="text-gray-600">Shows responsibilities across departments or roles, with clear visual separation of duties.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlowRepresentationContainer;
