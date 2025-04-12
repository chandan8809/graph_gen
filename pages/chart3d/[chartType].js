import ThreeDChartsContainer from "@/components/3dChartsContainer";

const DiagramPage = ({ chartType }) => {
  return <ThreeDChartsContainer chartType={chartType} />;
  // return <div> hello</div>
};

export async function getServerSideProps(context) {
  const { chartType } = context.params;
  
  // Validate the diagram type - add the new diagram types to this list
  const validTypes = [
    'bar', 
   'contour',
    'mesh',
    'network'
  ];
  
  if (!validTypes.includes(chartType)) {
    return {
      notFound: true, // Return 404 page if diagram type is invalid
    };
  }
  
  return {
    props: { chartType },
  };
}

export default DiagramPage;
