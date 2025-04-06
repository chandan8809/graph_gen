import React, { useState, useEffect, useRef } from 'react';
import mermaid from 'mermaid';

const DataFlowDiagram = () => {
  const [diagramCode, setDiagramCode] = useState(
    `flowchart TD
    User(("User"))
    OrderSystem["Order Processing System"]
    Inventory[("Inventory Database")]
    Payment["Payment Gateway"]
    Shipping["Shipping System"]
    Email["Email Service"]
    Analytics["Analytics System"]
    
    %% Data flows
    User -->|1. Place order| OrderSystem
    OrderSystem -->|2. Check stock| Inventory
    Inventory -->|3. Stock status| OrderSystem
    OrderSystem -->|4. Process payment| Payment
    Payment -->|5. Payment confirmation| OrderSystem
    OrderSystem -->|6. Update inventory| Inventory
    OrderSystem -->|7. Create shipment| Shipping
    Shipping -->|8. Shipment confirmation| OrderSystem
    OrderSystem -->|9. Send confirmation| Email
    Email -->|10. Notification| User
    OrderSystem -->|11. Order data| Analytics
    
    %% Style nodes by type
    classDef external fill:#f9a825,stroke:#f57f17,color:black
    classDef process fill:#42a5f5,stroke:#1976d2,color:white
    classDef datastore fill:#66bb6a,stroke:#388e3c,color:white
    
    class User external
    class OrderSystem,Payment,Shipping,Email,Analytics process
    class Inventory datastore`
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
        <h2 className="text-2xl font-semibold mb-4">Data Flow Diagram Editor</h2>
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
            placeholder="Enter your data flow diagram code here..."
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
          <p>Use the Mermaid flowchart syntax to define your data flow diagram:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><code>flowchart TD</code> - Top-down flowchart for DFD</li>
            <li><code>ExternalEntity((Label))</code> - External entity (rounded circle)</li>
            <li><code>Process[Label]</code> - Process (rectangle)</li>
            <li><code>DataStore[(Label)]</code> - Data store (cylinder)</li>
            <li><code>A --{'>'}|flow label| B</code> - Data flow with label</li>
            <li><code>A -.{'>'}|flow label| B</code> - Dashed data flow</li>
            <li><code>classDef className fill:#color,stroke:#color</code> - Define style classes</li>
            <li><code>class Node1,Node2 className</code> - Apply styles to nodes</li>
            <li><code>%% Comment</code> - Add comments (not rendered)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DataFlowDiagram;
