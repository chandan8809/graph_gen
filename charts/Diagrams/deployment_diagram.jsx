import React, { useState, useEffect, useRef } from 'react';
import mermaid from 'mermaid';

const DeploymentDiagram = () => {
  const [diagramCode, setDiagramCode] = useState(
    `graph TB
    subgraph Client["Client Environment"]
      Browser["Web Browser"]
      MobileApp["Mobile Application"]
    end
    
    subgraph Cloud["Cloud Environment"]
      subgraph WebServerTier["Web Server Tier"]
        LoadBalancer["Load Balancer\n(NGINX)"]
        WebServer1["Web Server 1\n(Node.js)"]
        WebServer2["Web Server 2\n(Node.js)"]
      end
      
      subgraph ApplicationTier["Application Tier"]
        AppServer1["App Server 1\n(Express.js)"]
        AppServer2["App Server 2\n(Express.js)"]
        Cache["Redis Cache"]
      end
      
      subgraph DatabaseTier["Database Tier"]
        PrimaryDB["Primary Database\n(PostgreSQL)"]
        ReplicaDB["Replica Database\n(PostgreSQL)"]
        
        subgraph Storage["Storage"]
          ObjectStorage["Object Storage\n(S3)"]
        end
      end
    end
    
    Browser --> LoadBalancer
    MobileApp --> LoadBalancer
    LoadBalancer --> WebServer1
    LoadBalancer --> WebServer2
    WebServer1 --> AppServer1
    WebServer2 --> AppServer2
    AppServer1 <--> Cache
    AppServer2 <--> Cache
    AppServer1 --> PrimaryDB
    AppServer2 --> PrimaryDB
    PrimaryDB --> ReplicaDB
    AppServer1 --> ObjectStorage
    AppServer2 --> ObjectStorage`
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
        <h2 className="text-2xl font-semibold mb-4">Deployment Diagram Editor</h2>
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
            placeholder="Enter your deployment diagram code here..."
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
          <p>Use the Mermaid graph syntax to define your deployment diagram:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><code>graph TB</code> - Top to bottom graph orientation</li>
            <li><code>subgraph Name["Label"]</code> - Create a container/node group</li>
            <li><code>end</code> - End a subgraph definition</li>
            <li><code>NodeName["Label"]</code> - Define a node with label</li>
            <li><code>NodeName["Label\nMultiline"]</code> - Multi-line node labels</li>
            <li><code>NodeA --{'>'}  NodeB</code> - Directed connection</li>
            <li><code>NodeA {"<"}--{'>'}  NodeB</code> - Bidirectional connection</li>
            <li><code>NodeA -- "Label" --{'>'}  NodeB</code> - Connection with label</li>
            <li><code>style NodeA fill:#f9f,stroke:#333,stroke-width:4px</code> - Custom styling</li>
            <li><code>class NodeA,NodeB highlight</code> - Apply CSS classes</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DeploymentDiagram;
