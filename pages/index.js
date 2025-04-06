
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
      <title>ChartPlot - Create Charts Online</title>
        <meta name="description" content="Make beautiful charts and graphs with ease using ChartPlot. No code needed." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="ChartPlot - Online Chart Maker" />
        <meta property="og:description" content="Create stunning charts and graphs with ChartPlot." />
        <meta property="og:url" content="https://chartplot.online/" />
        <link rel="canonical" href="https://chartplot.online/" />
    </Head>
      {/* <ExcelLikeTableWithChartOptions/> */}
      <ChartVisualizer/>
  
    </>
  );
}
