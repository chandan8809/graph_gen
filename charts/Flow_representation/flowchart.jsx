import React, { useState, useEffect, useRef } from 'react';
import mermaid from 'mermaid';

const Flowchart = () => {
  const [diagramCode, setDiagramCode] = useState(
    `flowchart LR
    A[Start] --> B{Is it raining?}
    B -->|Yes| C[Take umbrella]
    B -->|No| D[Wear sunglasses]
    C --> E[Go outside]
    D --> E
    E --> F[Return home]
    F --> G[End]
    
    style A fill:#bbf,stroke:#55f,stroke-width:2px
    style G fill:#fbb,stroke:#f55,stroke-width:2px
    style B fill:#ff9,stroke:#990,stroke-width:2px`
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
        <h2 className="text-2xl font-semibold mb-4">Flowchart Editor</h2>
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
            placeholder="Enter your flowchart code here..."
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
          <p>Use the Mermaid flowchart syntax to create flowcharts:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><code>flowchart TD</code> - Top-down direction (TD) or left-right (LR)</li>
            <li><code>A[Text]</code> - Rectangular node</li>
            <li><code>B(Text)</code> - Rounded rectangular node</li>
            <li><code>C((Text))</code> - Circle node</li>
            <li><code>D{'{'} Text {'}'}</code> - Diamond/rhombus node for decisions</li>
            <li><code>E[(Text)]</code> - Database cylinder</li>
            <li><code>F{'>'} Text]</code> - Flag/document shape</li>
            <li><code>G[/Text/]</code> - Parallelogram (input/output)</li>
            <li><code>H[\Text\]</code> - Trapezoid</li>
            <li><code>I[/\Text/\]</code> - Hexagon</li>
            <li><code>A {'-->'} B</code> - Arrow connection</li>
            <li><code>A {'-->'}|Text| B</code> - Arrow with label</li>
            <li><code>A {'-.->'} B</code> - Dotted line arrow</li>
            <li><code>A {'==>'} B</code> - Thick arrow</li>
            <li><code>subgraph Title ... end</code> - Group related nodes</li>
            <li><code>style A fill:#f9f,stroke:#333</code> - Custom node styling</li>
            <li><code>classDef className fill:#f9f,stroke:#333</code> - Define a style class</li>
            <li><code>class A,B className</code> - Apply a style to nodes</li>
            <li><code>click A href "https://example.com"</code> - Add clickable links</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Flowchart;
