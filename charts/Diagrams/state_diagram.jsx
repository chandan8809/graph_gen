import React, { useState, useEffect, useRef } from 'react';
import mermaid from 'mermaid';

const StateDiagram = () => {
  const [diagramCode, setDiagramCode] = useState(
    `stateDiagram-v2
    [*] --> Idle
    
    Idle --> Processing: Submit Order
    Processing --> Validating: Verify Items
    
    state Validating {
      [*] --> CheckInventory
      CheckInventory --> VerifyPayment
      VerifyPayment --> [*]
    }
    
    Validating --> Confirmed: Valid Order
    Validating --> Rejected: Invalid Order
    
    Confirmed --> Shipping: Prepare Shipment
    Shipping --> Delivered: Package Delivered
    
    Rejected --> Cancelled: Cancel Process
    Delivered --> [*]
    Cancelled --> [*]
    
    Confirmed --> Refunded: Request Refund
    Refunded --> [*]`
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
        <h2 className="text-2xl font-semibold mb-4">State Diagram Editor</h2>
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
            placeholder="Enter your state diagram code here..."
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
          <p>Use the Mermaid stateDiagram syntax to define your state diagram:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><code>stateDiagram-v2</code> - Start a state diagram with version 2 syntax</li>
            <li><code>[*] --{'>'}  State1</code> - Initial transition to a state</li>
            <li><code>State1 --{'>'}  [*]</code> - Final transition from a state</li>
            <li><code>State1 --{'>'}  State2: Event</code> - Transition with event label</li>
            <li><code>state State1 {"{"} ... {"}"}</code> - Nested/composite state</li>
            <li><code>state "Long State Name" as LongName</code> - State with alias</li>
            <li><code>state Fork {"<<"} fork {">>"}</code> - Fork notation</li>
            <li><code>state Join {"<<"} join {">>"}</code> - Join notation</li>
            <li><code>state if_state {"<<"} choice {">>"}</code> - Decision/choice point</li>
            <li><code>note right of State1: This is a note</code> - Add notes to states</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StateDiagram;
