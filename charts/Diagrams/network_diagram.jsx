import React, { useState, useEffect, useRef } from 'react';
import mermaid from 'mermaid';

const NetworkDiagram = () => {
  const [diagramCode, setDiagramCode] = useState(
    `graph TB
    subgraph Internet
        Cloud((Internet))
    end
    
    subgraph "Corporate Network"
        subgraph "DMZ"
            Firewall1[(Firewall)]
            LoadBalancer[Load Balancer]
            WAF[Web Application Firewall]
            WebServer1[Web Server 1]
            WebServer2[Web Server 2]
        end
        
        Firewall2[(Internal Firewall)]
        
        subgraph "Internal Network"
            subgraph "Application Tier"
                AppServer1[App Server 1]
                AppServer2[App Server 2]
                CacheServer[(Redis Cache)]
            end
            
            subgraph "Database Tier"
                DBMaster[(Primary DB)]
                DBSlave1[(Replica DB 1)]
                DBSlave2[(Replica DB 2)]
            end
            
            subgraph "Storage"
                NAS[(NAS Storage)]
                SAN[(SAN)]
            end
            
            ActiveDirectory[Active Directory]
            InternalDNS[DNS Server]
            SMTP[Mail Server]
        end
        
        subgraph "Management Network"
            Monitoring[Monitoring System]
            Backup[Backup Server]
            LogServer[Log Server]
        end
    end
    
    %% Connections
    Cloud -- HTTPS --- Firewall1
    Firewall1 --- LoadBalancer
    LoadBalancer --- WAF
    WAF --- WebServer1
    WAF --- WebServer2
    
    WebServer1 --- Firewall2
    WebServer2 --- Firewall2
    
    Firewall2 --- AppServer1
    Firewall2 --- AppServer2
    
    AppServer1 --- CacheServer
    AppServer2 --- CacheServer
    
    AppServer1 --- DBMaster
    AppServer2 --- DBMaster
    
    DBMaster --- DBSlave1
    DBMaster --- DBSlave2
    
    AppServer1 --- NAS
    AppServer2 --- NAS
    DBMaster --- SAN
    
    AppServer1 --- ActiveDirectory
    AppServer2 --- ActiveDirectory
    AppServer1 --- InternalDNS
    AppServer2 --- InternalDNS
    
    Monitoring --- AppServer1
    Monitoring --- AppServer2
    Monitoring --- WebServer1
    Monitoring --- WebServer2
    Monitoring --- DBMaster
    
    LogServer --- WebServer1
    LogServer --- WebServer2
    LogServer --- AppServer1
    LogServer --- AppServer2
    
    %% Styling
    classDef firewall fill:#ff9800,stroke:#e65100,color:white
    classDef server fill:#2196f3,stroke:#0d47a1,color:white
    classDef database fill:#4caf50,stroke:#1b5e20,color:white
    classDef storage fill:#9c27b0,stroke:#4a148c,color:white
    classDef network fill:#f44336,stroke:#b71c1c,color:white
    
    class Firewall1,Firewall2 firewall
    class WebServer1,WebServer2,AppServer1,AppServer2,LoadBalancer,WAF,Monitoring,Backup,LogServer,ActiveDirectory,InternalDNS,SMTP server
    class DBMaster,DBSlave1,DBSlave2,CacheServer database
    class NAS,SAN storage
    class Cloud network`
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
        <h2 className="text-2xl font-semibold mb-4">Network Diagram Editor</h2>
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
            placeholder="Enter your network diagram code here..."
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
          <p>Use the Mermaid flowchart syntax to define your network diagram:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><code>graph TB</code> - Top to bottom diagram layout</li>
            <li><code>subgraph "Name" ... end</code> - Group network components</li>
            <li><code>ComponentName[Label]</code> - Rectangle node (server, device)</li>
            <li><code>ComponentName[(Label)]</code> - Database/cylinder shape</li>
            <li><code>ComponentName((Label))</code> - Circle shape (cloud, network)</li>
            <li><code>A --- B</code> - Connection between components</li>
            <li><code>A -- "HTTPS" --- B</code> - Labeled connection</li>
            <li><code>classDef className fill:#color,stroke:#color</code> - Define style classes</li>
            <li><code>class Component1,Component2 className</code> - Apply styles</li>
            <li><code>%% Comment</code> - Add comments (not rendered)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NetworkDiagram;
