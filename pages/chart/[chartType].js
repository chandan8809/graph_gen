import ExcelLikeTableWithChartOptions from "@/components/MainContainer";

const ChartPage = ({ chartType }) => {
  return <ExcelLikeTableWithChartOptions chartType={chartType} />;
};

export async function getServerSideProps(context) {
  const { chartType } = context.query;
  return {
    props: { chartType },
  };
}

export default ChartPage;

