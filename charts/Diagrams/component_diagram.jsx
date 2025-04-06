import React, { useState, useEffect, useRef } from 'react';
import mermaid from 'mermaid';

const ComponentDiagram = () => {
  const [diagramCode, setDiagramCode] = useState(
    `flowchart TB
    subgraph Browser["Web Browser"]
        UI["User Interface"]
        WebStorage["Local Storage"]
    end
    
    subgraph BackEnd["Server"]
        subgraph API["API Layer"]
            Controllers["REST Controllers"]
            Auth["Authentication"]
            Validation["Request Validation"]
        end
        
        subgraph Business["Business Layer"]
            Services["Services"]
            DomainModel["Domain Model"]
        end
        
        subgraph DataAccess["Data Access Layer"]
            Repositories["Repositories"]
            ORM["ORM"]
        end
        
        subgraph External["External Services"]
            PaymentService["Payment Gateway"]
            EmailService["Email Service"]
            Analytics["Analytics"]
        end
    end
    
    Database[(Database)]
    Cache[(Redis Cache)]
    
    %% Connections
    UI <---> Controllers
    UI <---> WebStorage
    Controllers <---> Auth
    Controllers <---> Validation
    Controllers <---> Services
    Services <---> DomainModel
    Services <---> Repositories
    Services <---> External
    Repositories <---> ORM
    ORM <---> Database
    Services <---> Cache
    
    style UI fill:#42A5F5,stroke:#1976D2,color:white
    style Database fill:#66BB6A,stroke:#43A047,color:white
    style Cache fill:#FF7043,stroke:#E64A19,color:white
    style External fill:#AB47BC,stroke:#7B1FA2,color:white`
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
        <h2 className="text-2xl font-semibold mb-4">Component Diagram Editor</h2>
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
            placeholder="Enter your component diagram code here..."
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
          <p>Use the Mermaid flowchart syntax to define your component diagram:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><code>flowchart TB</code> - Top to bottom diagram layout</li>
            <li><code>Component["Label"]</code> - Define a component</li>
            <li><code>Database[("Database")]</code> - Cylinder shape for databases</li>
            <li><code>subgraph Name["Label"] ... end</code> - Group related components</li>
            <li><code>A --{'>'}  B</code> - Bidirectional connection</li>
            <li><code>A --{'>'}  B</code> - Directional connection</li>
            <li><code>A -.-{'>'}  B</code> - Dashed connection</li>
            <li><code>A ==={'>'}  B</code> - Thick connection (interface)</li>
            <li><code>style Component fill:#color,stroke:#color</code> - Component styling</li>
            <li><code>%% Comment</code> - Add comments (not rendered)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ComponentDiagram;
