import Layout from "../../components/layout";
import { getAllStageIds, getStageData } from "../../lib/stages";
import Head from "next/head";
import Image from "next/image";
import EnemySimple from "../../components/EnemySimple";

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
        <title>{stageData.name}</title>
      </Head>
      <Image
        src={`/images/maps/${stageData.name}.jpg`}
        alt={stageData.name}
		height="600px"
		width="1062px"
      ></Image>
      <EnemySimple stageData={stageData} />
    </Layout>
  );
}
