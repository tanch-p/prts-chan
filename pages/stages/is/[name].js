import Layout from "../../../components/layout";
import { getAllStageIds, getStageData } from "../../../lib/stages";
import Head from "next/head";
import Map from "../../../components/Map";
import EnemySimple from "../../../components/EnemySimple";
import { useState } from "react";
import AppContext from "../../../context/AppContext";
import { useContext } from "react";
import { TabComponent } from "../../../components/Tabs";

export async function getStaticProps({ params }) {
	const stageData = await getStageData(params.name, "is");
	return {
		props: {
			stageData,
		},
	};
}

export async function getStaticPaths() {
	const paths = getAllStageIds("is");
	// const locales = ["en", "jp"];
	// const paths = [];
	// for (const locale of locales) {
	//   allStages.forEach((ele) => {
	//     ele.locale = locale;
	//     paths.push(JSON.parse(JSON.stringify(ele)));
	//   });
	// }

	return {
		paths,
		fallback: false,
	};
}

export default function Stage({ stageData }) {
	// console.log(stageData);
	const { languageContext, device } = useContext(AppContext);
	const [language] = languageContext;
	const [mode, setMode] = useState("normal");
	const { mapConfig } = stageData;
	const [multiplier, setMultiplier] = useState({
		ALL: {
			hp: 1,
			atk: 1,
			def: 1,
			mdef: 0,
			aspd: 1,
			ms: 1,
			range: 1,
			weight: 0,
		},
	});
	const [specialMods, setSpecialMods] = useState({});

	const fontThemes = { en: "font-sans", jp: "font-jp font-light" };

	const tabArr = [
		{
			key: "normal",
			title: "Normal",
			children: (
				<EnemySimple
					mapConfig={mapConfig}
					multiplier={multiplier}
					specialMods={specialMods}
					mode="normal"
					language={language}
					device={device}
					fontThemes={fontThemes}
				/>
			),
		},
		{
			key: "hard",
			title: "Hard",
			children: (
				<EnemySimple
					mapConfig={mapConfig}
					multiplier={multiplier}
					specialMods={specialMods}
					mode="hard"
					language={language}
					device={device}
					fontThemes={fontThemes}
				/>
			),
		},
	];

	return (
		<Layout banner={"test"}>
			<Head>
				<title>{mapConfig.name[language]}</title>
			</Head>
			<Map
				mapConfig={mapConfig}
				language={language}
				device={device}
				fontThemes={fontThemes}
			/>

			{mapConfig.hasOwnProperty("hard_mods") ? (
				<TabComponent tabArr={tabArr} />
			) : (
				<EnemySimple
					mapConfig={mapConfig}
					multiplier={multiplier}
					specialMods={specialMods}
					language={language}
					device={device}
					fontThemes={fontThemes}
				/>
			)}
		</Layout>
	);
}
