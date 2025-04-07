import React, { useState, useEffect, useRef } from 'react';
import mermaid from 'mermaid';

const SequenceDiagram = () => {
  const [diagramCode, setDiagramCode] = useState(
    `sequenceDiagram
    actor Customer
    participant ShoppingCart
    participant OrderSystem
    participant InventorySystem
    participant PaymentGateway
    participant EmailService
    
    Customer->>ShoppingCart: Add items
    ShoppingCart->>ShoppingCart: Update cart
    Customer->>ShoppingCart: Proceed to checkout
    ShoppingCart->>OrderSystem: Create order
    OrderSystem->>InventorySystem: Check availability
    
    alt Items Available
        InventorySystem->>OrderSystem: Confirm availability
        OrderSystem->>PaymentGateway: Process payment
        
        alt Payment Successful
            PaymentGateway->>OrderSystem: Confirm payment
            OrderSystem->>InventorySystem: Update inventory
            OrderSystem->>EmailService: Send order confirmation
            EmailService->>Customer: Deliver order confirmation
            OrderSystem->>Customer: Display success message
        else Payment Failed
            PaymentGateway->>OrderSystem: Payment error
            OrderSystem->>Customer: Show payment error
        end
        
    else Items Not Available
        InventorySystem->>OrderSystem: Report unavailable items
        OrderSystem->>Customer: Show unavailable message
    end`
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
        <h2 className="text-2xl font-semibold mb-4">Sequence Diagram Editor</h2>
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
            placeholder="Enter your sequence diagram code here..."
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
          <p>Use the Mermaid sequenceDiagram syntax to define your sequence diagram:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><code>sequenceDiagram</code> - Start a sequence diagram</li>
            <li><code>participant Name</code> - Define a participant</li>
            <li><code>actor Name</code> - Define an actor (human)</li>
            <li><code>A-{'>'}B: Message</code> - Solid line (synchronous)</li>
            <li><code>A--{'>'}B: Message</code> - Dashed line (asynchronous)</li>
            <li><code>A-{'>'}{'>'}B: Message</code> - Solid arrow (synchronous)</li>
            <li><code>A--{'>'}{'>'}B: Message</code> - Dashed arrow (asynchronous)</li>
            <li><code>alt Condition ... else Alternative ... end</code> - Alternative paths</li>
            <li><code>loop Text ... end</code> - Looping section</li>
            <li><code>Note right of A: Text</code> - Add notes</li>
            <li><code>activate A</code> - Show activation</li>
            <li><code>deactivate A</code> - End activation</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SequenceDiagram;
