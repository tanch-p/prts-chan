import Layout from "../../components/layout";
import { getAllStageIds, getStageData } from "../../lib/stages";
import Head from "next/head";

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

export default function Post({ stageData }) {
	return (
		<Layout>
			<Head>
				<title>{stageData.name}</title>
			</Head>
			{stageData.name}
		</Layout>
	);
}