import Layout from "@/components/layout";
import { getAllStageIds, getStageData } from "@/lib/stages";
import Head from "next/head";
import Map from "@/components/Map";
import EnemySimple from "@/components/EnemySimple";
import { useState, useEffect } from "react";
import { useAppContext } from "context/AppContext";
import FooterBar from "@/components/IS/Footer_bar";
import FloorNavigation from "@/components/IS/Floor_navigation";
import ModeToggle from "@/components/Mode_toggle";
import { TabComponent } from "@/components/Tabs";

export async function getStaticProps({ params }) {
	const stagesList = getAllStageIds("is");
	const stageData = await getStageData(params.name, "is");
	return {
		props: {
			stageData,
			stagesList,
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

export default function Stage({ stageData, stagesList }) {
	// console.log(stageData);
	const { language, floor, setFloor, device } = useAppContext();
	const { mapConfig } = stageData;
	const theme = mapConfig.hasOwnProperty("theme") ? mapConfig.theme : "";
	const fontThemes = { en: "font-sans", jp: "font-jp font-light" };
	const [hardMode, setHardMode] = useState(false);
	const langPack = require(`../../../lang/${language}.json`);

	const tabArr = [
		{
			key: "normal",
			title: langPack.normal_mode,
			children: (
				<EnemySimple
					mapConfig={mapConfig}
					mode="normal"
					language={language}
					device={device}
					fontThemes={fontThemes}
				/>
			),
		},
		{
			key: "hard",
			title: langPack.hard_mode,
			children: (
				<EnemySimple
					mapConfig={mapConfig}
					mode="hard"
					language={language}
					device={device}
					fontThemes={fontThemes}
				/>
			),
		},
	];


	

	return (
		<Layout theme={theme} floor={mapConfig.floor}>
			<Head>
				<title>{mapConfig.name[language]}</title>
			</Head>
			<div className="w-[100vw] md:w-full max-w-5xl">
				<Map
					mapConfig={mapConfig}
					language={language}
					device={device}
					fontThemes={fontThemes}
				/>

				{mapConfig.hasOwnProperty("hard_mods") ? (
					<TabComponent tabArr={tabArr} />
				) : (
					<div className="">
						<EnemySimple
							mapConfig={mapConfig}
							language={language}
							device={device}
							fontThemes={fontThemes}
						/>
					</div>
				)}
				<FloorNavigation stagesList={stagesList} floor={floor} />
			</div>
			<FooterBar />
		</Layout>
	);
}
