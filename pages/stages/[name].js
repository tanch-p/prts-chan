import Layout from "../../components/layout";
import { getAllStageIds, getStageData } from "../../lib/stages";
import Head from "next/head";
import Image from "next/image";
import Map from "../../components/Map";
import EnemySimple from "../../components/EnemySimple";
import CC_buttons from "../../components/CC_buttons";

export async function getStaticProps({ params }) {
  const stageData = await getStageData(params.name);
  return {
    props: {
      stageData,
    },
  };
}

export async function getStaticPaths() {
  const paths = getAllStageIds();
  return {
    paths,
    fallback: false,
  };
}

export default function Stage({ stageData }) {
  // console.log(stageData);

  return (
    <Layout>
      <Head>
        <title>{stageData.mapConfig.name}</title>
      </Head>
      <header className="w-full">
        <h2>{stageData.mapConfig.name}</h2>
      </header>

      <Map mapConfig={stageData.mapConfig} />
      {stageData.mapConfig.isCC ? <CC_buttons mapConfig={stageData.mapConfig} /> : null}

      <EnemySimple stageData={stageData} />
    </Layout>
  );
}
