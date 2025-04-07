import React, { useState, useEffect, useRef } from 'react';
import mermaid from 'mermaid';

const ERDDiagram = () => {
  const [diagramCode, setDiagramCode] = useState(
    `erDiagram
    CUSTOMER ||--o{ ORDER : places
    CUSTOMER {
        string name
        string email
        string address
        string phone
    }
    ORDER ||--|{ ORDER_ITEM : contains
    ORDER {
        int order_id
        date created_at
        string status
        float total_amount
    }
    PRODUCT ||--o{ ORDER_ITEM : "ordered in"
    PRODUCT {
        int product_id
        string name
        string description
        float price
        int stock
    }
    ORDER_ITEM {
        int order_item_id
        int order_id
        int product_id
        int quantity
        float price
    }
    PAYMENT ||--|| ORDER : "paid for"
    PAYMENT {
        int payment_id
        string payment_method
        date payment_date
        float amount
    }`
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
        <h2 className="text-2xl font-semibold mb-4">Entity-Relationship Diagram Editor</h2>
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
            placeholder="Enter your ER diagram code here..."
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
          <p>Use the Mermaid ER diagram syntax to define your entity-relationship diagram:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><code>erDiagram</code> - Start an ER diagram</li>
            <li><code>ENTITY_NAME</code> - Define an entity (table)</li>
            <li><code>ENTITY {"{"} attribute_type attribute_name {"}"}</code> - Define entity attributes</li>
            <li><code>ENTITY1 {"||--o{"} ENTITY2 : "relationship"</code> - Define relationships between entities</li>
            <li><code>ENTITY1 {"||--|{"} ENTITY2</code> - One-to-many relationship</li>
            <li><code>ENTITY1 {"}|--|{"} ENTITY2</code> - Many-to-many relationship</li>
            <li><code>ENTITY1 {"||--||"} ENTITY2</code> - One-to-one relationship</li>
            <li><code>ENTITY1 {"}o--o{"} ENTITY2</code> - Zero or many to zero or many relationship</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ERDDiagram;