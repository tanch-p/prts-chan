import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Layout, { siteTitle } from "../components/layout";
import { getSortedStagesData } from "../lib/stages";
import { useContext, useEffect } from "react";
import AppContext from "../components/AppContext";
import dayjs from "dayjs";

//images
import cc7_banner from "../public/images/banners/cc7_banner.jpg";

export async function getStaticProps() {
	const allStagesData = getSortedStagesData();
	// console.log("allStagesData", allStagesData);
	return {
		props: {
			allStagesData,
		},
	};
}

export default function Home({ allStagesData }) {
	const { languageContext, device } = useContext(AppContext);
	const [language] = languageContext;
	const langPack = require(`../lang/${language}.json`);
	const firstCCDate = dayjs("3/1");
	const dailyStages =
		language === "en"
			? [
					"Area 6",
					"Area 6",
					"Abandoned Plot",
					"Deserted Factory",
					"Locked-Down Prison",
					"Arena 8",
					"Windswept Highland",
					"Abandoned Mine",
					"Deserted Factory",
					"Abandoned Plot",
					"Arena 8",
					"Abandoned Mine",
					"Windswept Highland",
					"Locked-Down Prison",
			  ]
			: [
					"第6区跡",
					"第6区跡",
					"棄てられし区画",
					"廃工場",
					"閉鎖監獄",
					"8号競技場",
					"風蝕の高原",
					"無秩序な鉱区",
					"廃工場",
					"棄てられし区画",
					"8号競技場",
					"無秩序な鉱区",
					"風蝕の高原",
					"閉鎖監獄",
			  ];
	const dailyCCArr = [];
	const links = [
		"CC6_第6区跡",
		"CC6_第6区跡",
		"CC6_棄てられし区画_1",
		"CC6_廃工場_1",
		"CC6_閉鎖監獄_1",
		"CC6_8号競技場_1",
		"CC6_風蝕の高原_1",
		"CC6_無秩序な鉱区_1",
		"CC6_廃工場_2",
		"CC6_棄てられし区画_2",
		"CC6_8号競技場_2",
		"CC6_無秩序な鉱区_2",
		"CC6_風蝕の高原_2",
		"CC6_閉鎖監獄_2",
	];

	// for (let i = 0; i < dailyStages.length; i++) {
	// 	dailyCCArr.push(
	// 		<>
	// 			<div className="flex flex-wrap flex-col w-[25%] md:w-min">
	// 				<div className="border border-collapse border-gray-400 h-[25px] w-full md:w-[80px] text-base">
	// 					{`3/${i + 1}`}
	// 				</div>
	// 				{i > 13 ? (
	// 					<div
	// 						className={`border border-collapse border-gray-400 ${
	// 							language === "jp" ? "text-sm" : "text-xs"
	// 						}  h-[40px] w-full md:w-[80px] `}
	// 					>
	// 						<p className="">{dailyStages[i]}</p>
	// 					</div>
	// 				) : (
	// 					<Link href={`/stages/cc/${links[i]}`}>
	// 						<div
	// 							className={`border border-collapse border-gray-400 ${
	// 								language === "jp" ? "text-sm" : "text-xs"
	// 							} hover:cursor-pointer hover:bg-gray-300 h-[40px] w-full md:w-[80px] underline text-blue-700`}
	// 						>
	// 							<p className="">{dailyStages[i]}</p>
	// 						</div>
	// 					</Link>
	// 				)}
	// 			</div>
	// 		</>
	// 	);
	// }

	const getTheme = () => {
		return language === "en" ? "text-xs" : "";
	};

	return (
		<Layout>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<div
				id="home-container"
				className={`flex flex-col min-h-[100vh] place-content-center ${
					language === "jp" ? "font-jp" : "font-sans"
				}`}
			>
				<div id="cc6" className="w-full md:min-w-10">
					<table className="text-center align-middle">
						<div className="relative w-[95vw] mx-auto md:w-[560px]">
							<Image src={cc7_banner} className="inline-block" alt={"CC7"} />
						</div>
						<tr className="border border-collapse border-gray-400 py-1">
							<th> {language === "jp" ? "常設ステージ" : "Permanent Stage"}</th>
						</tr>
						<Link href={`/stages/cc/cc7-perma`}>
							<div className="border border-collapse py-2 border-gray-400 text-base hover:cursor-pointer hover:bg-gray-300 underline text-blue-700">
								{language === "jp" ? "灰齐山麓" : "Permanent Stage"}
							</div>
						</Link>
						<tr>
							<th className="border border-collapse border-gray-400 py-1">
								{language === "jp" ? "デイリーステージ" : "Daily Stages"}
							</th>
						</tr>
						<div>
							<div
								className={`flex flex-wrap flex-row relative w-[95vw] md:w-[560px] ${getTheme()}`}
							>
								{dailyCCArr}
							</div>
						</div>
					</table>
				</div>
				<div className="w-100vw ml-2 md:ml-0 md:w-[560px] mt-6">
					<ul>
						{language === "jp" ? (
							<li className="  ">
								皆さん危機契約お疲れさまでした！今のところこのサイトは特にアップデートはありませんが、９章の敵データはWikiruやPRTS
								Wikiに載せてありますので、ぜひそちらのデータをご覧になってください。
							</li>
						) : (
							<li className="">
								Hope you found this site useful for CC6! If you are looking for
								data for chapter 9, I believe the currently available tools
								(PRTS Wiki & Aceship) will be sufficient. I will be working on
								the layout/extra functions for CC7 and IS in the meantime. See
								you in CC7!
							</li>
						)}
					</ul>
				</div>
			</div>
		</Layout>
	);
}
