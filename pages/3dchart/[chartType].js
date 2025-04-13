import ThreeDChartsContainer from "../../components/3dChartsContainer";

const ThreeDChartPage = ({ chartType }) => {
  return <ThreeDChartsContainer chartType={chartType} />;
};

export async function getServerSideProps(context) {
  const { chartType } = context.params;
  
  // Validate the chart type
  const validTypes = [
    'bar', 
    'contour',
    'mesh',
    'network',
    'scatter',
    'surface'
  ];
  
  if (!validTypes.includes(chartType)) {
    return {
      notFound: true, // Return 404 page if chart type is invalid
    };
  }
  
  return {
    props: { chartType },
  };
}

export default ThreeDChartPage; 