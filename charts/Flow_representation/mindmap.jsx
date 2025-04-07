import React, { useState, useEffect, useRef } from 'react';
import mermaid from 'mermaid';

const MindMap = () => {
  const [diagramCode, setDiagramCode] = useState(
    `mindmap
    root((Project Planning))
      Research
        Market Analysis
          Competitors
          Consumer Needs
        Technical Feasibility
          Resources Required
          Timeline
      Design
        UI/UX
          Wireframes
          Prototypes
        Architecture
          Database Design
          API Endpoints
      Development
        Frontend
          Component Structure
          State Management
        Backend
          Business Logic
          Data Models
      Testing
        Unit Tests
        Integration Tests
        User Acceptance
      Deployment
        Staging
        Production
      Maintenance
        Bug Fixes
        Feature Updates`
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
        <h2 className="text-2xl font-semibold mb-4">Mind Map Editor</h2>
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
            placeholder="Enter your mind map code here..."
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
          <p>Use the Mermaid mindmap syntax to create hierarchical mind maps:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><code>mindmap</code> - Begin a mind map diagram</li>
            <li><code>root((Central Topic))</code> - Define the central/root node with circle shape</li>
            <li><code>Topic</code> - A main branch (indent with spaces or tabs)</li>
            <li><code>  Subtopic</code> - Further indentation creates hierarchy levels</li>
            <li><code>root(Central Topic)</code> - Root node with rounded rectangle</li>
            <li><code>root[Central Topic]</code> - Root node with square edges</li>
            <li><code>root{'{{'}Central Topic{'}}'}</code> - Root node with hexagon shape</li>
            <li><code>root{'>'}Central Topic]</code> - Root node with asymmetric shape</li>
            <li><code>Topic::icon</code> - Add an icon from Font Awesome (if configured)</li>
            <li><code>id1[Topic]:::style1</code> - Apply a style class to a node</li>
            <li><code>classDef style1 fill:#f9f,stroke:#333,stroke-width:2px</code> - Define a style class</li>
          </ul>
          <p className="mt-4">Mind maps automatically use indentation to create the hierarchy, making them simple to create and maintain.</p>
        </div>
      </div>
    </div>
  );
};

export default MindMap;
