import React, { useState, useEffect, useRef } from 'react';
import mermaid from 'mermaid';

const UseCaseDiagram = () => {
  const [diagramCode, setDiagramCode] = useState(
    `graph TB
    Customer(["Customer"])
    Admin(["Admin"])
    ShippingClerk(["Shipping Clerk"])
    
    UC1["Browse Products"]
    UC2["Search Products"]
    UC3["Add to Cart"]
    UC4["Checkout"]
    UC5["Manage Orders"]
    UC6["Process Refund"]
    UC7["Update Inventory"]
    
    subgraph "E-Commerce System"
    UC1
    UC2
    UC3
    UC4
    UC5
    UC6
    UC7
    end
    
    Customer --- UC1
    Customer --- UC2
    Customer --- UC3
    Customer --- UC4
    Admin --- UC5
    Admin --- UC6
    Admin --- UC7
    ShippingClerk --- UC5
    ShippingClerk --- UC7
    
    UC3 -.->|includes| UC2
    UC4 -.->|includes| UC3`
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
        <h2 className="text-2xl font-semibold mb-4">Use Case Diagram Editor</h2>
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
            placeholder="Enter your use case diagram code here..."
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
          <p>Use the Mermaid graph syntax to define your use case diagram:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><code>Customer([&quot;Customer&quot;])</code> - Define an actor</li>
            <li><code>UC1[&quot;Use Case Name&quot;]</code> - Define a use case</li>
            <li><code>subgraph &quot;System Name&quot; ... end</code> - Define system boundary</li>
            <li><code>Actor --- UseCase</code> - Connect actor to use case</li>
            <li><code>UseCase1 -.{'>'}|extends| UseCase2</code> - Extends relationship</li>
            <li><code>UseCase1 -.{'>'}|includes| UseCase2</code> - Includes relationship</li>
            <li><code>Note right of UseCase: Text</code> - Add a note</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UseCaseDiagram;
