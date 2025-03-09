
import WeightLossMedication from "@/components/HomePage.jsx";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>MetabolixMD - Home</title>
        <meta name="description" content="MetabolixMD offers personalized weight loss solutions using FDA-approved GLP-1 and GLP-1/GIP medications, delivered directly to your door. Our expert team provides tailored care to help you achieve your health goals." />
      </Head>
      <WeightLossMedication />
    </>
  );
}
