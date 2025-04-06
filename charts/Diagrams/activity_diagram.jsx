import React, { useState, useEffect, useRef } from 'react';
import mermaid from 'mermaid';

const ActivityDiagram = () => {
  const [diagramCode, setDiagramCode] = useState(
    `flowchart TD
    Start([Start]) --> CheckStock{Check Stock}
    
    CheckStock -->|In Stock| ProcessOrder[Process Order]
    CheckStock -->|Out of Stock| Reorder[Reorder Items]
    
    Reorder --> Notify[Notify Vendor]
    Notify --> Wait[Wait for Delivery]
    Wait --> ReceiveItems[Receive Items]
    ReceiveItems --> UpdateInventory[Update Inventory]
    UpdateInventory --> ProcessOrder
    
    ProcessOrder --> PrepareShipment[Prepare Shipment]
    PrepareShipment --> Ship[Ship Order]
    Ship --> SendEmail[Send Email Notification]
    SendEmail --> MarkComplete[Mark as Complete]
    MarkComplete --> End([End])
    
    style Start fill:#4CAF50,stroke:#388E3C,color:#fff
    style End fill:#F44336,stroke:#D32F2F,color:#fff
    style CheckStock fill:#FFEB3B,stroke:#FBC02D
    style ProcessOrder fill:#2196F3,stroke:#1976D2
    style Ship fill:#9C27B0,stroke:#7B1FA2,color:#fff`
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
        <h2 className="text-2xl font-semibold mb-4">Activity Diagram Editor</h2>
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
            placeholder="Enter your activity diagram code here..."
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
          <p>Use the Mermaid flowchart syntax to define your activity diagram:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><code>flowchart TD</code> - Top-down flowchart (activity diagram)</li>
            <li><code>Start([Text])</code> - Rounded oval node (start/end)</li>
            <li><code>Process[Text]</code> - Rectangle node (process/activity)</li>
            <li><code>Decision{Text}</code> - Diamond node (decision point)</li>
            <li><code>A --{'>'}  B</code> - Arrow connection</li>
            <li><code>A --{'>'}|Label| B</code> - Arrow with label</li>
            <li><code>style NodeName fill:#color,stroke:#color</code> - Node styling</li>
            <li><code>subgraph Title ... end</code> - Group activities into a swimlane</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ActivityDiagram;
