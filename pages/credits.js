import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";

export default function Credits({ allStagesData }) {

  // const langPack = require(`../lang/${language}.json`);

  return (
    <Layout >
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div id="home-container" className="min-h-[100vh] font-sans">
        <p className="lg:max-w-xl my-3">
          PRTS-chan utilises assets (including but not limited to) pictures,
          original text and other works for the purpose of better reflecting the
          corresponding elements in the game and enhance the user experience.
          The copyright of such works belongs to the provider of the game,
          Shanghai Hypergryph Network Technology Co., Ltd. and/or its
          affiliates, including but not limited to YOSTAR (HONG KONG) LIMITED,
          株式会社Yostar, YOSTAR LIMITED, 龍成網路, etc,.
        </p>
      </div>
    </Layout>
  );
}
