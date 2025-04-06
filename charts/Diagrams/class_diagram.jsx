import React, { useState, useEffect, useRef } from 'react';
import mermaid from 'mermaid';

const ClassDiagram = () => {
  const [diagramCode, setDiagramCode] = useState(
    `classDiagram
    class Animal {
      +String name
      +int age
      +makeSound()
    }
    class Dog {
      +String breed
      +fetch()
    }
    class Cat {
      +String color
      +scratch()
    }
    Animal <|-- Dog
    Animal <|-- Cat`
  );
  
  const [error, setError] = useState(null);
  const diagramRef = useRef(null);

  useEffect(() => {
    mermaid.initialize({ 
      startOnLoad: true,
      theme: 'default',
      securityLevel: 'loose'
    });
    renderDiagram();
  }, []);

  const renderDiagram = () => {
    if (diagramRef.current) {
      try {
        diagramRef.current.innerHTML = diagramCode;
        setError(null);
        mermaid.init(undefined, diagramRef.current);
      } catch (err) {
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
        <h2 className="text-2xl font-semibold mb-4">Class Diagram Editor</h2>
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
            placeholder="Enter your class diagram code here..."
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
          <div ref={diagramRef} className="mermaid">
            {diagramCode}
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white p-5 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Syntax Guide</h3>
        <div className="prose max-w-none">
          <p>Use the Mermaid syntax to define your class diagram. Here's a quick reference:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><code>class ClassName</code> - Define a class</li>
            <li><code>+String attributeName</code> - Public attribute</li>
            <li><code>-int privateField</code> - Private attribute</li>
            <li><code>+methodName()</code> - Method</li>
            <li><code>ClassA &lt;|-- ClassB</code> - Inheritance (ClassB inherits from ClassA)</li>
            <li><code>ClassA *-- ClassB</code> - Composition</li>
            <li><code>ClassA o-- ClassB</code> - Aggregation</li>
            <li><code>ClassA &lt;-- ClassB</code> - Association</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ClassDiagram;
