
import ChartVisualizer from "@/components/HomePage";
import Head from 'next/head';
// import ExcelLikeTableWithChartOptions from "@/components/InputSheets";


export default function Home() {
  return (
    
    <>
      <Head>
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-BJPK6YK3MV"></script>
      <script>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-BJPK6YK3MV');
        `}
      </script>
    </Head>
      {/* <ExcelLikeTableWithChartOptions/> */}
      <ChartVisualizer/>
  
    </>
  );
}
