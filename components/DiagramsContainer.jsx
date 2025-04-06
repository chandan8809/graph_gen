import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { Activity } from 'lucide-react';

// Create a client-only component
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
  const [mounted, setMounted] = useState(false);
  const [uniqueId, setUniqueId] = useState(`mermaid-${Date.now()}`);

  useEffect(() => {
    setMounted(true);
    
    if (mounted) {
      renderDiagram();
    }
  }, [mounted]);

  const renderDiagram = async () => {
    if (!mounted) return;
    
    try {
      // Generate a new ID to force re-rendering
      setUniqueId(`mermaid-${Date.now()}`);
      setError(null);
      
      // Import mermaid dynamically
      const { default: mermaid } = await import('mermaid');
      
      // Reset and initialize mermaid each time for reliable rendering
      mermaid.initialize({
        startOnLoad: false,
        theme: 'default',
        securityLevel: 'loose',
        htmlLabels: true
      });
      
      // Wait for the component to update with the new ID
      setTimeout(() => {
        try {
          // Clear previous diagram content and render new one
          if (diagramRef.current) {
            mermaid.render(uniqueId, diagramCode).then(({ svg }) => {
              diagramRef.current.innerHTML = svg;
            });
          }
        } catch (err) {
          setError(`Rendering error: ${err.message}`);
          console.error('Render error:', err);
        }
      }, 0);
    } catch (err) {
      setError(`Mermaid error: ${err.message}`);
      console.error('Mermaid error:', err);
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
          {mounted ? (
            <div ref={diagramRef} className="diagram-container">
              <div className="flex justify-center items-center h-64">
                <p className="text-gray-500">Click 'Render Diagram' to see the preview</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center h-64">
              <p className="text-gray-500">Loading...</p>
            </div>
          )}
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

// Export as a dynamic component with SSR disabled
export default dynamic(() => Promise.resolve(ClassDiagram), { ssr: false });
