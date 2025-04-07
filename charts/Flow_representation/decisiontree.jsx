import React, { useState, useEffect, useRef } from 'react';
import mermaid from 'mermaid';

const DecisionTree = () => {
  const [diagramCode, setDiagramCode] = useState(
    `graph TD
    A[Start] --> B{Is the customer new?}
    B -->|Yes| C[Offer welcome discount]
    B -->|No| D{Loyalty tier?}
    C --> E[Process order]
    D -->|Bronze| F[Apply 5% discount]
    D -->|Silver| G[Apply 10% discount]
    D -->|Gold| H[Apply 15% discount]
    F --> E
    G --> E
    H --> E
    E --> I[Ship order]
    I --> J{Any issues?}
    J -->|Yes| K[Contact customer]
    J -->|No| L[Send feedback request]
    K --> M[Resolve issues]
    M --> L
    L --> N[End]`
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
        curve: 'basis',
        diagramPadding: 8
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
        <h2 className="text-2xl font-semibold mb-4">Decision Tree Editor</h2>
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
            placeholder="Enter your decision tree code here..."
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
          <p>Use the Mermaid flowchart syntax to define your decision tree:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><code>graph TD</code> - Top-down graph (TD) or left-right (LR)</li>
            <li><code>A[Text]</code> - Node with rectangular shape</li>
            <li><code>B{Text}</code> - Node with rhombus (diamond) shape for decisions</li>
            <li><code>C(Text)</code> - Node with rounded edges</li>
            <li><code>D((Text))</code> - Node with circle shape</li>
            <li><code>A --{'>'} B</code> - Arrow from node A to node B</li>
            <li><code>A --{'>'}|Yes| B</code> - Arrow with text</li>
            <li><code>A -.--{'>'}|No| B</code> - Dashed arrow with text</li>
            <li><code>subgraph Title ... end</code> - Group of nodes</li>
            <li><code>style A fill:#f9f,stroke:#333,stroke-width:2px</code> - Apply styles to nodes</li>
            <li><code>classDef className fill:#f9f,stroke:#333,stroke-width:2px</code> - Define a class style</li>
            <li><code>class A,B className</code> - Apply a class to nodes</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DecisionTree;
