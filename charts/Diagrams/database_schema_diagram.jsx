import React, { useState, useEffect, useRef } from 'react';
import mermaid from 'mermaid';

const DatabaseSchemaDiagram = () => {
  const [diagramCode, setDiagramCode] = useState(
    `classDiagram
    class users {
      <<Table>>
      +id INT PK
      +username VARCHAR(255) UK
      +email VARCHAR(255) UK
      +password_hash VARCHAR(255)
      +created_at TIMESTAMP
      +updated_at TIMESTAMP
    }
    
    class posts {
      <<Table>>
      +id INT PK
      +user_id INT FK
      +title VARCHAR(255)
      +content TEXT
      +status ENUM
      +created_at TIMESTAMP
      +updated_at TIMESTAMP
    }
    
    class comments {
      <<Table>>
      +id INT PK
      +post_id INT FK
      +user_id INT FK
      +content TEXT
      +created_at TIMESTAMP
      +updated_at TIMESTAMP
    }
    
    class categories {
      <<Table>>
      +id INT PK
      +name VARCHAR(100) UK
      +description TEXT
    }
    
    class post_categories {
      <<Table>>
      +post_id INT PK, FK
      +category_id INT PK, FK
    }
    
    class tags {
      <<Table>>
      +id INT PK
      +name VARCHAR(50) UK
    }
    
    class post_tags {
      <<Table>>
      +post_id INT PK, FK
      +tag_id INT PK, FK
    }
    
    users "1" -- "n" posts : creates
    posts "1" -- "n" comments : has
    users "1" -- "n" comments : writes
    posts "n" -- "m" categories : belongs to
    post_categories -- posts
    post_categories -- categories
    posts "n" -- "m" tags : tagged with
    post_tags -- posts
    post_tags -- tags`
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
        <h2 className="text-2xl font-semibold mb-4">Database Schema Diagram Editor</h2>
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
            placeholder="Enter your database schema diagram code here..."
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
          <p>Use the Mermaid class diagram syntax to define your database schema:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><code>classDiagram</code> - Start a class diagram (used for database schema)</li>
            <li><code>class tablename {"{"} ... {"}"}</code> - Define a table</li>
            <li><code>{"<<" + " Table " + ">>"}</code> - Stereotypes for tables</li>
            <li><code>+column_name DATA_TYPE</code> - Define a column</li>
            <li><code>PK</code> - Primary Key indicator</li>
            <li><code>FK</code> - Foreign Key indicator</li>
            <li><code>UK</code> - Unique Key indicator</li>
            <li><code>table1 "1" -- "n" table2 : relationship</code> - Define relationships</li>
            <li><code>junction_table -- table1</code> - Connect junction table</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DatabaseSchemaDiagram;
