import React, { useState, useEffect, useRef } from 'react';
import mermaid from 'mermaid';

const Swimlane = () => {
  const [diagramCode, setDiagramCode] = useState(
    `%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#f5f5f5', 'primaryTextColor': '#333', 'primaryBorderColor': '#aaa', 'lineColor': '#666', 'secondaryColor': '#f0f0f0', 'tertiaryColor': '#fff' }}}%%
    flowchart TB
    
    %% Define the swimlanes
    subgraph Customer
        A[Visit Website] --> B[Browse Products]
        B --> C[Select Items]
        C --> D[Add to Cart]
        D --> E[Checkout]
        E --> F[Provide Shipping Info]
        F --> G[Provide Payment Info]
        G --> H[Confirm Order]
        H --> I[Receive Order Confirmation]
        Q[Receive Package] --> R[Product Satisfaction?]
    end
    
    subgraph Sales
        I --> J[Process Order]
        J --> K{Inventory Check}
    end
    
    subgraph Warehouse
        K -->|Available| L[Allocate Items]
        K -->|Not Available| M[Order from Supplier]
        M --> N[Receive Items]
        N --> L
        L --> O[Pack Order]
        O --> P[Ship Order]
    end
    
    subgraph Shipping
        P --> Q
    end
    
    subgraph Support
        R -->|No| S[Contact Support]
        S --> T[Process Return/Refund]
        R -->|Yes| U[Leave Review]
    end
    
    %% Style the swimlanes
    classDef customerLane fill:#e1f5fe,stroke:#01579b,color:#01579b
    classDef salesLane fill:#e8f5e9,stroke:#2e7d32,color:#2e7d32
    classDef warehouseLane fill:#fff8e1,stroke:#ff8f00,color:#ff8f00
    classDef shippingLane fill:#f3e5f5,stroke:#7b1fa2,color:#7b1fa2
    classDef supportLane fill:#ffebee,stroke:#c62828,color:#c62828
    
    class Customer customerLane
    class Sales salesLane
    class Warehouse warehouseLane
    class Shipping shippingLane
    class Support supportLane`
  );
  
  const [error, setError] = useState(null);
  const diagramRef = useRef(null);
  const [diagramId, setDiagramId] = useState(`mermaid-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    mermaid.initialize({ 
      startOnLoad: false,
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
        <h2 className="text-2xl font-semibold mb-4">Swimlane Diagram Editor</h2>
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
            placeholder="Enter your swimlane diagram code here..."
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
          <p>Use the Mermaid flowchart with subgraphs to create swimlane diagrams:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><code>flowchart TB</code> - Top-to-bottom orientation (or use LR for left-to-right)</li>
            <li><code>%%{`init: {'theme': 'base', 'themeVariables': {...}}`}%%</code> - Custom theme configuration</li>
            <li><code>subgraph Department ... end</code> - Create a swimlane for each department/role</li>
            <li><code>A[Task]</code> - Regular task node</li>
            <li><code>B{'{'} Decision {'}'}</code> - Decision point</li>
            <li><code>A {'-->'} B</code> - Connection between nodes</li>
            <li><code>A {'-->'}|Condition| B</code> - Connection with condition text</li>
            <li><code>classDef className fill:#color,stroke:#color,color:#color</code> - Define a style class</li>
            <li><code>class Department className</code> - Apply style to entire swimlane</li>
            <li><code>class A,B,C className</code> - Apply style to individual nodes</li>
          </ul>
          <p className="mt-4">Swimlane diagrams help visualize process flows across different departments, teams, or roles, showing responsibilities and handoffs.</p>
        </div>
      </div>
    </div>
  );
};

export default Swimlane;
