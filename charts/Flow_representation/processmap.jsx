import React, { useState, useEffect, useRef } from 'react';
import mermaid from 'mermaid';

const ProcessMap = () => {
  const [diagramCode, setDiagramCode] = useState(
    `flowchart TD
    subgraph "Customer Service"
      A[Receive Customer Inquiry] --> B[Create Ticket]
      B --> C{Type of Inquiry}
    end
    
    subgraph "Technical Support"
      C -->|Technical Issue| D[Assign to Technician]
      D --> E[Troubleshoot Problem]
      E --> F{Resolved?}
      F -->|No| G[Escalate to Specialist]
      G --> H[Advanced Troubleshooting]
      H --> I{Fixable?}
      I -->|No| J[Recommend Replacement]
      I -->|Yes| K[Apply Fix]
      F -->|Yes| L[Document Solution]
      K --> L
    end
    
    subgraph "Administrative"
      C -->|Billing Question| M[Review Account]
      M --> N[Resolve Billing Issue]
      N --> O[Update Account Notes]
      J --> P[Process RMA]
      L --> Q[Close Ticket]
      O --> Q
      P --> Q
    end
    
    subgraph "Quality Control"
      Q --> R[Customer Follow-up]
      R --> S[Satisfaction Survey]
      S --> T[Review Process Metrics]
    end
    
    style A fill:#d4f1f9,stroke:#1c87c9
    style Q fill:#ffdb99,stroke:#ff9900
    style T fill:#c6ecc6,stroke:#5cb85c
    
    classDef technical fill:#e6f3ff,stroke:#3498db
    classDef administrative fill:#fff2e6,stroke:#ff8c1a
    classDef quality fill:#e6ffe6,stroke:#5cb85c
    
    class D,E,F,G,H,I,J,K,L technical
    class M,N,O,P administrative
    class Q,R,S,T quality`
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
        <h2 className="text-2xl font-semibold mb-4">Process Map Editor</h2>
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
            placeholder="Enter your process map code here..."
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
          <p>Use the Mermaid flowchart syntax with subgraphs to create process maps:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><code>flowchart TD</code> - Top-down direction (TD) or left-right (LR)</li>
            <li><code>subgraph "Group Name" ... end</code> - Group processes by department/phase</li>
            <li><code>A[Process Step]</code> - Rectangle for standard process steps</li>
            <li><code>B{'{'} Decision Point {'}'}</code> - Diamond for decision points</li>
            <li><code>C[(Database)]</code> - Cylinder for data storage</li>
            <li><code>D((Event))</code> - Circle for events or triggers</li>
            <li><code>A {'-->'} B</code> - Standard connection</li>
            <li><code>A {'-->'}|Condition| B</code> - Connection with label</li>
            <li><code>A {'-.->'} B</code> - Dotted connection</li>
            <li><code>style A fill:#d4f1f9,stroke:#1c87c9</code> - Custom styling</li>
            <li><code>classDef className fill:#e6f3ff,stroke:#3498db</code> - Define a class style</li>
            <li><code>class A,B,C className</code> - Apply class to multiple nodes</li>
          </ul>
          <p className="mt-4">Process maps work best with clear subgraphs representing different departments, phases, or responsibility areas.</p>
        </div>
      </div>
    </div>
  );
};

export default ProcessMap;
