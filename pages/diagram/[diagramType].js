import DiagramsContainer from "@/components/DiagramsContainer";

const DiagramPage = ({ diagramType }) => {
  return <DiagramsContainer diagramType={diagramType} />;
};

export async function getServerSideProps(context) {
  const { diagramType } = context.params;
  
  // Validate the diagram type - add the new diagram types to this list
  const validTypes = [
    'class', 
    'object', 
    'usecase', 
    'state', 
    'deployment', 
    'activity', 
    'sequence', 
    'component',
    'erd',
    'database',
    'network',
    'dataflow',
    'block'
  ];
  
  if (!validTypes.includes(diagramType)) {
    return {
      notFound: true, // Return 404 page if diagram type is invalid
    };
  }
  
  return {
    props: { diagramType },
  };
}

export default DiagramPage;