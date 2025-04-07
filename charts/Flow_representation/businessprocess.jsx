import React, { useState, useEffect, useRef } from 'react';
import mermaid from 'mermaid';

const BusinessProcess = () => {
  const [diagramCode, setDiagramCode] = useState(
    `flowchart TD
    Start([Start]) --> A[Customer submits order]
    A --> B[Sales department receives order]
    
    subgraph Order Processing
      B --> C{Inventory check}
      C -->|Items available| D[Process payment]
      C -->|Items unavailable| E[Order items from supplier]
      E --> F[Await delivery]
      F --> D
      D --> G{Payment successful?}
      G -->|Yes| H[Prepare shipment]
      G -->|No| I[Contact customer]
      I --> J{Issue resolved?}
      J -->|Yes| D
      J -->|No| K[Cancel order]
    end
    
    H --> L[Ship package]
    L --> M[Update tracking information]
    M --> N[Send notification to customer]
    
    K --> End([End])
    N --> End`
  );
  
  const [error, setError] = useState(null);
  const diagramRef = useRef(null);
  const [diagramId, setDiagramId] = useState(`mermaid-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    mermaid.initialize({ 
      startOnLoad: false,
      theme: 'default',
      securityLevel: 'loose',
      fontFamily: 'monospace',
      flowchart: {
        diagramPadding: 8,
        htmlLabels: true,
        curve: 'basis'
      }
    });
    renderDiagram();
  }, []);

  const renderDiagram = async () => {
    if (diagramRef.current) {
      try {
        // Clear previous content
        diagramRef.current.innerHTML = '';
        setError(null);
        
        // Generate a new ID for this render
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        setDiagramId(id);
        
        // Use mermaid.render
        const { svg } = await mermaid.render(id, diagramCode);
        
        // Set the rendered SVG as the innerHTML
        diagramRef.current.innerHTML = svg;
      } catch (err) {
        console.error('Rendering error:', err);
        setError(`Error rendering diagram: ${err.message}`);
      }
    }
  };

  const handleCodeChange = (e) => {
    setDiagramCode(e.target.value);
  };

  const handleRender = () => {
    renderDiagram();
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Business Process Editor</h2>
        <div className="bg-white p-5 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <label htmlFor="diagram-code" className="text-lg font-medium">Mermaid Diagram Code:</label>
            <button 
              onClick={handleRender}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Render Diagram
            </button>
          </div>
          <textarea
            id="diagram-code"
            value={diagramCode}
            onChange={handleCodeChange}
            className="w-full h-64 p-4 border border-gray-300 rounded font-mono text-sm"
            placeholder="Enter your business process diagram code here..."
          />
          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-white p-5 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Diagram Preview</h3>
        <div className="border border-gray-200 rounded-lg p-6 bg-gray-50 overflow-auto">
          <div ref={diagramRef} className="diagram-container"></div>
        </div>
      </div>

      <div className="mt-8 bg-white p-5 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Syntax Guide</h3>
        <div className="prose max-w-none">
          <p>Use the Mermaid flowchart syntax to define your business process:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><code>flowchart TD</code> - Top-down layout (TD) or left-right (LR)</li>
            <li><code>Start([Text])</code> - Node with stadium/pill shape for start/end points</li>
            <li><code>A[Text]</code> - Node with rectangular shape for tasks/activities</li>
            <li><code>B{Text}</code> - Node with rhombus shape for decisions</li>
            <li><code>C((Text))</code> - Node with circle shape for events</li>
            <li><code>D[(Text)]</code> - Database symbol</li>
            <li><code>E((Text))</code> - Circle node for events</li>
            <li><code>A --{'>'} B</code> - Arrow connection</li>
            <li><code>A --{'>'}|Text| B</code> - Arrow with text label</li>
            <li><code>A =={'>'} B</code> - Thick arrow</li>
            <li><code>A -.--{'>'} B</code> - Dotted line arrow</li>
            <li><code>subgraph Title ... end</code> - Group related nodes in a labeled container</li>
            <li><code>%% Comment</code> - Add comments to your diagram</li>
            <li><code>style A fill:#f9f,stroke:#333,stroke-width:2px</code> - Custom node styling</li>
            <li><code>classDef className fill:#f9f,stroke:#333,stroke-width:2px</code> - Define a class style</li>
            <li><code>class A,B className</code> - Apply a class to nodes</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BusinessProcess;
