import Layout from "../../components/layout";
import { getAllStageIds, getStageData } from "../../lib/stages";
import Head from "next/head";
import Map from "../../components/Map";
import EnemySimple from "../../components/EnemySimple";
import CC_buttons from "../../components/CC/CC_buttons";
import { useState } from "react";
import AppContext from "../../components/AppContext";
import { useContext } from "react";

export async function getStaticProps({ params }) {
  const stageData = await getStageData(params.name);
  return {
    props: {
      stageData,
    },
  };
}

export async function getStaticPaths() {
  const allStages = getAllStageIds();
  const locales = ["en", "jp"];
  const paths = [];
  for (const locale of locales) {
    allStages.forEach((ele) => {
      ele.locale = locale;
      paths.push(JSON.parse(JSON.stringify(ele)));
    });
  }

  // console.log(paths);
  return {
    paths,
    fallback: false,
  };
}

export default function Stage({ stageData }) {
  // console.log(stageData);
  const { languageContext, device } = useContext(AppContext);
  const [language] = languageContext;

  const { mapConfig } = stageData;
  const [multiplier, setMultiplier] = useState({});
  const [specialMods, setSpecialMods] = useState({});
  
  const fontThemes = {"en":"font-sans","jp":"font-jp font-light"}

  return (
    <Layout>
      <Head>
        <title>{mapConfig.name}</title>
      </Head>
      <header className="w-full">
        <h2>{mapConfig.name}</h2>
      </header>

      <Map mapConfig={mapConfig} language={language} device={device} fontThemes={fontThemes}/>
      {mapConfig.hasOwnProperty("ccType") ? (
        <CC_buttons
          mapConfig={mapConfig}
          setMultiplier={setMultiplier}
          setSpecialMods={setSpecialMods}
          language={language}
          device={device}
          fontThemes={fontThemes}
        />
      ) : null}

      <EnemySimple
        mapConfig={mapConfig}
        multiplier={multiplier}
        specialMods={specialMods}
        language={language}
        device={device}
        fontThemes={fontThemes}
      />
    </Layout>
  );
}
