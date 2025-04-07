import FlowRepresentationContainer from "@/components/FlowRepresentationContainer";

const FlowRepresentationPage = ({ flowType }) => {
  return <FlowRepresentationContainer flowType={flowType} />;
};

export async function getServerSideProps(context) {
  const { flowType } = context.params;
  
  // Validate the flow representation type
  const validTypes = [
    'decisiontree',
    'businessprocess',
    'mindmap',
    'algoflow',
    'flowchart',
    'processmap',
    'swimlane'
  ];
  
  if (!validTypes.includes(flowType)) {
    return {
      notFound: true, // Return 404 page if flow type is invalid
    };
  }
  
  return {
    props: { flowType },
  };
}

export default FlowRepresentationPage;
