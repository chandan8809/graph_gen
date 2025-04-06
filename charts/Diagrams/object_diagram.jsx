import React, { useState, useEffect, useRef } from 'react';
import mermaid from 'mermaid';

const ObjectDiagram = () => {
  const [diagramCode, setDiagramCode] = useState(
    `classDiagram
    class Car_Instance {
      +String make: "Toyota"
      +String model: "Corolla"
      +int year: 2020
      +String color: "Blue"
    }
    class Driver_Instance {
      +String name: "John Smith"
      +int age: 35
      +String licenseId: "D12345"
    }
    class Insurance_Instance {
      +String provider: "SafeDrive"
      +String policyNumber: "POL-987654"
      +Date expiryDate: "2023-12-31"
    }
    Driver_Instance "1" --> "1" Car_Instance : drives
    Car_Instance "1" --> "1" Insurance_Instance : covered by`
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
        <h2 className="text-2xl font-semibold mb-4">Object Diagram Editor</h2>
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
            placeholder="Enter your object diagram code here..."
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
          <p>Use the Mermaid syntax to define your object diagram. Object diagrams use class diagram syntax with specific instances:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><code>class ObjectName_Instance</code> - Define an object instance</li>
            <li><code>+Type attributeName: "value"</code> - Attribute with specific value</li>
            <li><code>ObjectA "1" --{'>'}  "1" ObjectB : relationship</code> - Define relationship with multiplicity</li>
            <li><code>ObjectA -- ObjectB : associates with</code> - Simple association</li>
            <li><code>note "text" as N1</code> - Add explanatory notes</li>
            <li><code>N1 -- ObjectA</code> - Connect note to object</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ObjectDiagram;
