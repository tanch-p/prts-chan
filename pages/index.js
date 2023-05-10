import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Layout, { siteTitle } from "../components/layout";
import { useAppContext } from "context/AppContext";
import CCIndex from "@/components/CC/CC_index";
import {
	normalOps,
	bossStage,
	encountStage,
} from "@/components/IS/Floor_navigation";

//images
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
		en: ["Map Data", "Relic Tooltips", "and more..."],
		jp: ["ステージ情報", "秘宝テキスト", "色々…"],
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
					{/* <CCIndex language={language} langPack={langPack} /> */}

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
				{/* <div className="w-100vw ml-2 md:ml-0 md:w-full mt-6 text-center">
					<ul>
						{linesOfText[language].map((line) => (
							<li key={line}>{line}</li>
						))}
					</ul>
				</div> */}
				{/* <NewStagesNav language={language} /> */}
				<div className="max-w-3xl px-2 mt-4">
					<p>
						{language === "jp" ? (
							<>
								<p className="font-semibold text-xl">お知らせ</p>
								<p className="mt-1">
									ドクターの皆さん、この1年間、このサイトをご利用いただきありがとうございました。新しいサイト
									<br />
									<a className="hover:text-sky-400" href="https://tomimi.dev">
										tomimi.dev
									</a>
									<br />
									に移行することになりましたので、お知らせいたします。
									今後も今までのように危機契約、統合戦略をサポート致します。
								</p>
							</>
						) : (
							<>
								<p className="font-semibold text-xl">Announcement</p>
								<p className="mt-1">
									Dear doctors, thank you for using this site for the past year
									and I would like to inform you that PRTSchan will be moving to
									a new site with a new name:
									<br />
									<a className="hover:text-sky-400" href="https://tomimi.dev">
										tomimi.dev
									</a>
									<br />
									You can expect the same support for upcoming CC/IS going
									ahead.
								</p>
							</>
						)}
					</p>
				</div>
				{/* <div className="justify-self-start mt-20 pl-8 md:pl-0">
					<ul>
						<span className="font-medium">{TODOtitle[language]}</span>
						{TODO[language].map((line) => (
							<li key={line} className="text-sm list-outside list-disc">
								{line}
							</li>
						))}
					</ul>
				</div> */}
			</div>
		</Layout>
	);
}

const NewStagesNav = ({ language }) => {
	const newCombatStages = [
		{ name: { en: "Fight to the Death", jp: "死闘" }, link: "ISW-NO_死斗" },
		{
			name: { en: "First Come, Last Served", jp: "早い者勝ち" },
			link: "ISW-NO_先来后到",
		},
		{
			name: { en: "Sculptor and Statue", jp: "彫刻師と石像" },
			link: "ISW-NO_雕匠与石像",
		},
		{
			name: { en: "Alpine Visitor", jp: "雪山の来客" },
			link: "ISW-NO_雪山上的来客",
		},
		{ name: { en: "From Afar", jp: "対岸の火事" }, link: "ISW-NO_隔岸观火" },
	];
	const newEncountStages = [
		{ name: { en: "Bound by Self", jp: "自縛" }, link: "ISW-SP_自缚" },
		{ name: { en: "Observation", jp: "観察" }, link: "ISW-SP_观察" },
	];
	const newBossStages = [
		{ name: { en: "New Chapter", jp: "新章の起稿" }, link: "ISW-DF_再启新篇" },
	];

	return (
		<div className="mt-4">
			<p className="text-center font-semibold">
				{language === "en" ? "New Stages:" : "追加されたステージ"}
			</p>
			<div className="w-[100vw] md:w-max mx-auto select-none shadow-lg mt-4">
				<div
					className={`flex flex-col md:grid items-center shadow-lg ${
						language === "jp"
							? "md:grid-cols-[100px_560px]"
							: "md:grid-cols-[100px_480px]"
					}`}
				>
					<div className="md:h-[68px] pt-4 md:pt-0 flex items-center">
						{normalOps}
					</div>
					<div className="flex flex-wrap items-center justify-center mb-1">
						{newCombatStages.map(({ name, link }) => (
							<Link href={`/stages/is/${link}`} key={link}>
								<div
									className={`hover:text-sky-400 md:h-full mx-2 my-3 md:my-1 text-center hover:cursor-pointer ${
										language === "en"
											? "text-sm w-[100px] py-1"
											: "whitespace-nowrap py-2 w-[120px]"
									}`}
								>
									<span>{name[language]}</span>
								</div>
							</Link>
						))}
					</div>
				</div>
				<div
					className={`flex flex-col md:grid items-center shadow-lg ${
						language === "jp"
							? "md:grid-cols-[100px_560px]"
							: "md:grid-cols-[100px_480px]"
					}`}
				>
					<div className="md:h-[68px] pt-4 md:pt-0 flex items-center">
						{encountStage}
					</div>
					<div className="flex flex-wrap items-center justify-center mb-1">
						{newEncountStages.map(({ name, link }) => (
							<Link href={`/stages/is/${link}`} key={link}>
								<div
									className={`hover:text-sky-400 md:h-full mx-2 my-3 md:my-1 text-center hover:cursor-pointer ${
										language === "en"
											? "text-sm w-[100px] py-1"
											: "whitespace-nowrap py-2 w-[120px]"
									}`}
								>
									<span>{name[language]}</span>
								</div>
							</Link>
						))}
					</div>
				</div>
				<div
					className={`flex flex-col md:grid items-center ${
						language === "jp"
							? "md:grid-cols-[100px_560px]"
							: "md:grid-cols-[100px_480px]"
					}`}
				>
					<div className="md:h-[68px] pt-4 md:pt-0 flex items-center">
						{bossStage}
					</div>
					<div className="flex flex-wrap items-center justify-center mb-1">
						{newBossStages.map(({ name, link }) => (
							<Link href={`/stages/is/${link}`} key={link}>
								<div
									className={`hover:text-sky-400 md:h-full mx-2 my-3 md:my-1 text-center hover:cursor-pointer ${
										language === "en"
											? "text-sm w-[100px] py-1"
											: "whitespace-nowrap py-2 w-[120px]"
									}`}
								>
									<span>{name[language]}</span>
								</div>
							</Link>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
