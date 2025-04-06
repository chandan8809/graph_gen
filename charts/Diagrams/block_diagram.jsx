import React, { useState, useEffect, useRef } from 'react';
import mermaid from 'mermaid';

const BlockDiagram = () => {
  const [diagramCode, setDiagramCode] = useState(
    `flowchart LR
    subgraph "Input Layer"
        I1[Data Collection]
        I2[Data Validation]
        I3[Data Preprocessing]
    end
    
    subgraph "Processing Layer"
        P1[Feature Extraction]
        P2[Model Training]
        P3[Model Evaluation]
    end
    
    subgraph "Output Layer"
        O1[Prediction]
        O2[Visualization]
        O3[Reporting]
    end
    
    subgraph "Storage Layer"
        S1[(Raw Data)]
        S2[(Processed Data)]
        S3[(Model Storage)]
        S4[(Results Database)]
    end
    
    %% Connections
    I1 --> I2 --> I3
    I3 --> P1 --> P2 --> P3
    P3 --> O1 --> O2 --> O3
    
    I1 -.-> S1
    I3 -.-> S2
    P2 -.-> S3
    O1 -.-> S4
    
    %% Styling
    classDef input fill:#bbdefb,stroke:#1976d2,color:#0d47a1
    classDef process fill:#c8e6c9,stroke:#388e3c,color:#1b5e20
    classDef output fill:#ffecb3,stroke:#ffa000,color:#ff6f00
    classDef storage fill:#e1bee7,stroke:#8e24aa,color:#4a148c
    
    class I1,I2,I3 input
    class P1,P2,P3 process
    class O1,O2,O3 output
    class S1,S2,S3,S4 storage`
  );
  
  const [error, setError] = useState(null);
  const diagramRef = useRef(null);
  const [diagramId, setDiagramId] = useState(`mermaid-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    mermaid.initialize({ 
      startOnLoad: false,
      theme: 'default',
      securityLevel: 'loose',
      fontFamily: 'monospace'
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
        
        // Use mermaid.render instead of mermaid.init
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
        <h2 className="text-2xl font-semibold mb-4">Block Diagram Editor</h2>
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
            placeholder="Enter your block diagram code here..."
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
          <p>Use the Mermaid flowchart syntax to define your block diagram:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><code>flowchart LR</code> - Left to right diagram layout</li>
            <li><code>subgraph "Name" ... end</code> - Group related components</li>
            <li><code>NodeID[Label]</code> - Rectangle node for process/component</li>
            <li><code>NodeID[(Label)]</code> - Database/cylinder shape</li>
            <li><code>NodeID((Label))</code> - Circle shape</li>
            <li><code>A {'-->'} B</code> - Arrow connection</li>
            <li><code>A {'-.->'} B</code> - Dashed arrow connection</li>
            <li><code>classDef className fill:#color,stroke:#color</code> - Define style classes</li>
            <li><code>class Node1,Node2 className</code> - Apply styles to nodes</li>
            <li><code>%% Comment</code> - Add comments (not rendered)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BlockDiagram;