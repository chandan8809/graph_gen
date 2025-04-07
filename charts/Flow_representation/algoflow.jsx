import React, { useState, useEffect, useRef } from 'react';
import mermaid from 'mermaid';

const AlgoFlow = () => {
  const [diagramCode, setDiagramCode] = useState(
    `flowchart TD
    Start([Start]) --> Init[Initialize variables]
    Init --> Inp[Get user input]
    Inp --> Check{Valid input?}
    Check -->|No| Error[Display error]
    Error --> Inp
    Check -->|Yes| Process[Process data]
    Process --> Calc[Perform calculations]
    Calc --> Res{Results OK?}
    Res -->|No| Debug[Debug issue]
    Debug --> Calc
    Res -->|Yes| Output[Display results]
    Output --> Question{Continue?}
    Question -->|Yes| Inp
    Question -->|No| End([End])`
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
        curve: 'linear'
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
        <h2 className="text-2xl font-semibold mb-4">Algorithm Flow Editor</h2>
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
            placeholder="Enter your algorithm flow code here..."
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
          <p>Use the Mermaid flowchart syntax to create algorithm flows:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><code>flowchart TD</code> - Top-down flow (TD) or left-right (LR)</li>
            <li><code>Start([Start])</code> - Stadium shape for start/end nodes</li>
            <li><code>A[Process]</code> - Rectangular nodes for processing steps</li>
            <li><code>B&#123;Decision&#125;</code> - Diamond shape for decision points</li>
            <li><code>C[(Database)]</code> - Database symbol</li>
            <li><code>D((Event))</code> - Circle for events</li>
            <li><code>E&gt;Document]</code> - Document shape</li>
            <li><code>A --&gt; B</code> - Arrow connection</li>
            <li><code>A --&gt;|Condition| B</code> - Arrow with label</li>
            <li><code>A {'-.->'} B</code> - Dashed arrow with label</li>
            <li><code>subgraph Title ... end</code> - Group nodes in a container</li>
            <li><code>style A fill:#f9f,stroke:#333</code> - Custom node styling</li>
            <li><code>classDef algorithm fill:#f96,stroke:#333</code> - Define a style class</li>
            <li><code>class A,B algorithm</code> - Apply a style class to nodes</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AlgoFlow;
