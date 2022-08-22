import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Layout, { siteTitle } from "../components/layout";
import { useAppContext } from "context/AppContext";
import CCIndex from "@/components/CC/CC_index";

//images

import phcs_main_banner from "@/public/images/banners/phcs-main-banner.png";
import phcs_banner_2 from "@/public/images/banners/phcs_banner_2.webp";

export default function Home() {
	const { language, device } = useAppContext();
	const langPack = require(`../lang/${language}.json`);

	const linesOfText = {
		jp: ["ミス・クリスティーンは君の到来を待っていたよ、", "ドクター"],
		en: ["Miss Christine has been awaiting your arrival,", "Doctor"],
	};
	const TODOtitle = { en: "To be implemented:", jp: "鋭意開発中：" };
	const TODO = {
		en: [
			"Map Data",
			"Enemy Routes",
			"Relic Tooltips",
			"Stage Name Translations",
			"and more...",
		],
		jp: ["ステージ情報", "敵ルート", "秘宝テキスト", "ステージ名翻訳", "色々…"],
	};

	return (
		<Layout>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<div
				id="home-container"
				className={`flex flex-col min-h-[80vh] place-content-center ${
					language === "jp" ? "font-jp" : "font-sans"
				}`}
			>
				<div id="main content" className="w-full md:min-w-10">
					<CCIndex language={language} langPack={langPack} />

					<div className="relative shadow-2xl max-w-screen-sm md:max-w-3xl">
						<Link href="/stages/is/ISW-NO_礼炮小队">
							<Image
								src={phcs_banner_2}
								layout="intrinsic"
								alt="phantom and crimson solitaire"
								className="hover:cursor-pointer"
							/>
						</Link>
					</div>
				</div>
				<div className="w-100vw ml-2 md:ml-0 md:w-full mt-6 text-center">
					<ul>
						{linesOfText[language].map((line) => (
							<li key={line}>{line}</li>
						))}
					</ul>
				</div>
				<div className="justify-self-start mt-20 pl-8 md:pl-0">
					<ul>
						<span className="font-medium">{TODOtitle[language]}</span>
						{TODO[language].map((line) => (
							<li key={line} className="text-sm list-outside list-disc">
								{line}
							</li>
						))}
					</ul>
				</div>
			</div>
		</Layout>
	);
}
