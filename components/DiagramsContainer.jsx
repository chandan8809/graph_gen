import React from 'react';
import dynamic from 'next/dynamic';
import { Activity } from 'lucide-react';

// Import all diagram components with SSR disabled
const ClassDiagram = dynamic(() => import('../charts/Diagrams/class_diagram'), { ssr: false });
const ObjectDiagram = dynamic(() => import('../charts/Diagrams/object_diagram'), { ssr: false });
const UseCaseDiagram = dynamic(() => import('../charts/Diagrams/use_case_diagram'), { ssr: false });
const StateDiagram = dynamic(() => import('../charts/Diagrams/state_diagram'), { ssr: false });
const DeploymentDiagram = dynamic(() => import('../charts/Diagrams/deployment_diagram'), { ssr: false });
const ActivityDiagram = dynamic(() => import('../charts/Diagrams/activity_diagram'), { ssr: false });
const SequenceDiagram = dynamic(() => import('../charts/Diagrams/sequence_diagram'), { ssr: false });
const ComponentDiagram = dynamic(() => import('../charts/Diagrams/component_diagram'), { ssr: false });

const DiagramsContainer = ({ diagramType }) => {
  // No global mermaid initialization here - each component handles its own

  // Decide which diagram to show based on diagramType parameter, if provided
  const renderDiagramByType = () => {
    if (diagramType) {
      switch (diagramType) {
        case 'class':
          return <ClassDiagram />;
        case 'object':
          return <ObjectDiagram />;
        case 'usecase':
          return <UseCaseDiagram />;
        case 'state':
          return <StateDiagram />;
        case 'deployment':
          return <DeploymentDiagram />;
        case 'activity':
          return <ActivityDiagram />;
        case 'sequence':
          return <SequenceDiagram />;
        case 'component':
          return <ComponentDiagram />;
        default:
          return null;
      }
    }
    return null;
  };

  // If a specific diagram type is requested, only show that one
  if (diagramType) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 flex items-center">
          <Activity className="mr-2" />
          UML {diagramType.charAt(0).toUpperCase() + diagramType.slice(1)} Diagram Editor
        </h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          {renderDiagramByType()}
        </div>
      </div>
    );
  }

  // Otherwise show all diagrams
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Activity className="mr-2" />
        UML Diagram Editor
      </h1>
      
      <div className="space-y-16">
        <section id="class-diagram">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Class Diagram</h2>
            <ClassDiagram />
          </div>
        </section>
        
        <section id="object-diagram">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Object Diagram</h2>
            <ObjectDiagram />
          </div>
        </section>
        
        <section id="usecase-diagram">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Use Case Diagram</h2>
            <UseCaseDiagram />
          </div>
        </section>
        
        <section id="state-diagram">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">State Diagram</h2>
            <StateDiagram />
          </div>
        </section>
        
        <section id="deployment-diagram">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Deployment Diagram</h2>
            <DeploymentDiagram />
          </div>
        </section>
        
        <section id="activity-diagram">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Activity Diagram</h2>
            <ActivityDiagram />
          </div>
        </section>
        
        <section id="sequence-diagram">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Sequence Diagram</h2>
            <SequenceDiagram />
          </div>
        </section>
        
        <section id="component-diagram">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Component Diagram</h2>
            <ComponentDiagram />
          </div>
        </section>
      </div>
      
      <div className="mt-12 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">About UML Diagrams</h2>
        <p className="mb-4">
          Unified Modeling Language (UML) is a standardized modeling language that helps in visualizing, specifying, 
          constructing, and documenting the artifacts of a software system.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-medium mb-2">Class Diagrams</h3>
            <p className="text-gray-600">Show the static structure of classes, their attributes, methods, and relationships.</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-medium mb-2">Object Diagrams</h3>
            <p className="text-gray-600">Show instances of classes (objects) at a specific point in time and their relationships.</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-medium mb-2">Use Case Diagrams</h3>
            <p className="text-gray-600">Illustrate system functionality from the user's perspective and actor interactions.</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-medium mb-2">State Diagrams</h3>
            <p className="text-gray-600">Model the behavior of objects through finite state transitions and events.</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-medium mb-2">Deployment Diagrams</h3>
            <p className="text-gray-600">Show the physical architecture and deployment of software components to hardware nodes.</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-medium mb-2">Activity Diagrams</h3>
            <p className="text-gray-600">Illustrate the flow of control and data among activities in a process.</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-medium mb-2">Sequence Diagrams</h3>
            <p className="text-gray-600">Show the sequence of messages and interactions between objects over time.</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-medium mb-2">Component Diagrams</h3>
            <p className="text-gray-600">Describe how components are wired together to form larger components or software systems.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagramsContainer;
