import Layout from "../../components/layout";
import { getAllStageIds, getStageData } from "../../lib/stages";
import Head from "next/head";
import Image from "next/image";
import Map from "../../components/Map";
import EnemySimple from "../../components/EnemySimple";
import CC_buttons from "../../components/CC/CC_buttons";
import { useState } from "react";

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
  const locales = ["en", "jp"];
  for (const locale of locales) {
    paths.forEach((ele) => (ele.locale = locale));
  }
  return {
    paths,
    fallback: false,
  };
}

export default function Stage({ stageData }) {
  // console.log(stageData);
  const { mapConfig } = stageData;
  const [multiplier, setMultiplier] = useState({});
  const [specialMods, setSpecialMods] = useState({});

  return (
    <Layout>
      <Head>
        <title>{mapConfig.name}</title>
      </Head>
      <header className="w-full">
        <h2>{mapConfig.name}</h2>
      </header>

      <Map mapConfig={mapConfig} />
      {mapConfig.hasOwnProperty("ccType") ? (
        <CC_buttons
          mapConfig={mapConfig}
          setMultiplier={setMultiplier}
          setSpecialMods={setSpecialMods}
        />
      ) : null}

      <EnemySimple
        mapConfig={mapConfig}
        multiplier={multiplier}
        specialMods={specialMods}
      />
    </Layout>
  );
}
