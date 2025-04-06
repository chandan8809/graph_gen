import DiagramsContainer from "@/components/DiagramsContainer";


const DiagramPage = ({ diagramType }) => {
  return <DiagramsContainer diagramType={diagramType} />;
};

export async function getServerSideProps(context) {
  const { diagramType } = context.query;
  return {
    props: { diagramType },
  };
}

export default DiagramPage;