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
	const firstCCDate = dayjs("6/9");
	const dailyStages = [
		{ text: "炽热溶洞", link: "CC7_炽热溶洞_1" },
		{ text: "炽热溶洞", link: "CC7_炽热溶洞_1" },
		{ text: "风蚀高地", link: "CC7_风蚀高地_1" },
		{ text: "闭锁监狱", link: "CC7_闭锁监狱_1" },
		{ text: "遗弃地块", link: "CC7_遗弃地块_1" },
		{ text: "无序矿区", link: "CC7_无序矿区_1" },
		{ text: "八号竞技场", link: "CC7_八号竞技场_1" },
		{ text: "狂嚎沙原", link: "CC7_狂嚎沙原_1" },
		{ text: "风蚀高地", link: "CC7_风蚀高地_2" },
		{ text: "狂嚎沙原", link: "CC7_狂嚎沙原_2" },
		{ text: "遗弃地块", link: "CC7_遗弃地块_2" },
		{ text: "八号竞技场", link: "CC7_八号竞技场_2" },
		{ text: "无序矿区", link: "CC7_无序矿区_2" },
		{ text: "炽热溶洞", link: "CC7_炽热溶洞_2" },
	];

	const dailyCCArr = [];

	for (const [index, { text, link }] of dailyStages.entries()) {
		dailyCCArr.push(
			<>
				<div className="flex flex-wrap flex-col w-[25%] md:w-min" key={link}>
					<div className="border border-collapse border-gray-400 h-[25px] w-full md:w-[80px] text-base">
						{`6/${index + 8 + 1}`}
					</div>
					<Link href={`/stages/cc/${link}`}>
						<div
							className={`border border-collapse border-gray-400 ${
								language === "jp" ? "text-sm" : "text-xs"
							} hover:cursor-pointer hover:bg-gray-300 h-[40px] w-full md:w-[80px] underline text-blue-700`}
						>
							<p>{langPack[text]}</p>
						</div>
					</Link>
				</div>
			</>
		);
	}

	const getTheme = () => {
		return language === "en" ? "text-xs" : "";
	};

	const linesOfText = {
		jp: [
			"頑張ってくださいドクター！",
			"不具合を見つかった場合は私のディスコード",
			"（IDはAboutページに）まで連絡お願いします",
		],
		en: [
			"All the best for CC#7 Doctor!",
			"If you find any bugs, please kindly report to my discord (ID in about page)",
		],
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
								{language === "jp" ? "灰斉山麓" : "Permanent Stage"}
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
				<div className="w-100vw ml-2 md:ml-0 md:w-[560px] mt-6 text-center">
					<ul>
						{linesOfText[language].map((line) => (
							<li key={line}>{line}</li>
						))}
					</ul>
				</div>
			</div>
		</Layout>
	);
}
