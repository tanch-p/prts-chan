import Layout from "@/components/layout";
import { getAllStageIds, getStageData } from "@/lib/stages";
import Head from "next/head";
import Image from "next/image";
import Map from "@/components/Map";
import EnemySimple from "@/components/EnemySimple";
import { useState, useEffect } from "react";
import { useAppContext } from "context/AppContext";

import Daily_buttons from "@/components/CC/Daily_buttons";
import Selected_options from "@/components/CC/Selected_options";
import Risk_triangle from "@/components/CC/Risk_triangle";

export async function getStaticProps({ params }) {
	const stagesList = getAllStageIds("cc");
	const stageData = await getStageData(params.name, "cc");
	return {
		props: {
			stageData,
			stagesList,
		},
	};
}

export async function getStaticPaths() {
	const paths = getAllStageIds("cc");
	// const locales = ["en", "jp"];
	// const paths = [];
	// for (const locale of locales) {
	//   allStages.forEach((ele) => {
	//     ele.locale = locale;
	//     paths.push(JSON.parse(JSON.stringify(ele)));
	//   });
	// }

	// console.log(paths);
	return {
		paths,
		fallback: false,
	};
}

export default function Stage({ stageData }) {
	const { language, device } = useAppContext();

	const { mapConfig } = stageData;
	const [multipliers, setMultipliers] = useState({
		ALL: { hp: 1, atk: 1, def: 1, res: 0, aspd: 1, ms: 1, range: 1, weight: 0 },
	});
	const [specialMods, setSpecialMods] = useState({});

	const fontThemes = { en: "font-sans", jp: "font-jp font-light" };

	let ccConfig = require(`../../../cc_config/${mapConfig.config}.json`);
	const [selected, setSelected] = useState([{}]);
	const [totalRisk, setTotalRisk] = useState(0);

	useEffect(() => {
		const categoryArr = [];
		for (const category of ccConfig) {
			if (!categoryArr.includes(category.category)) {
				categoryArr.push(category.category);
			}
		}
		setSelected(
			categoryArr.map((ele) => {
				return {
					category: ele,
					selected: false,
					option: "",
					tooltip: "",
					targets: [],
					effect: [],
				};
			})
		);
	}, []);

	const handleClick = (category, option) => {
		//   console.log("name",name)
		//   console.log("category", category)
		//   console.log(selected)
		const categoryIndex = -1;
		for (let i = 0; i < selected.length; i++) {
			//check if button has been selected before
			if (selected[i].category === category.category) {
				categoryIndex = i;
			}
			if (selected[i].option === option.img) {
				setSelected(
					selected.map((item, index) => {
						if (index === i) {
							return {
								category: item.category,
								selected: false,
								option: "",
								tooltip: "",
								effects: [],
								rank: 0,
							};
						} else {
							return item;
						}
					})
				);
				return;
			}
		}
		// if button has not been selected before
		// console.log("here")
		setSelected(
			selected.map((item, index) => {
				if (index === categoryIndex) {
					return {
						category: item.category,
						selected: true,
						option: option.img,
						tooltip: option.tooltip[language],
						effects: option.effects,
						rank: option.rank,
					};
				} else {
					return item;
				}
			})
		);
	};

	const toggleOptionColor = (category, name, type = "perma", ele) => {
		for (const item of selected) {
			if (item.category === category) {
				if (item.option === name) {
					return `bg-blue-500 ${type === "daily" ? "text-white" : ""}`;
				} else if (item.selected) {
					return `bg-rose-600 ${type === "daily" ? "text-white" : ""}`;
				} else {
					if (ele === "text") return "bg-neutral-100";
					return "";
				}
			}
		}
	};

	const getRankColor = (rank) => {
		switch (rank) {
			case 1:
				return "bg-gray-500";
			case 2:
				return "bg-gray-800";
			case 3:
				return "bg-red-800";
		}
	};

	const setOtherMods = (other_mods, obj) => {
		for (const key of Object.keys(obj)) {
			if (!key.includes("tooltip")) {
				if (key === "immune") {
					other_mods[key] = obj[key];
				} else if (typeof obj[key] !== "object") {
					other_mods[key] = obj[key];
				} else {
					if (!other_mods[key]) {
						other_mods[key] = {};
					}
					setOtherMods(other_mods[key], obj[key]);
				}
			} else {
				other_mods[key] = obj[key];
			}
		}
	};

	useEffect(() => {
		const multiplier = {
			ALL: { hp: 1, atk: 1, def: 1, res: 0, aspd: 1, ms: 1, weight: 0 },
		};
		const other_mods = {};
		for (const category of selected) {
			if (category.selected) {
				for (const effect of category.effects) {
					for (const target of effect.targets) {
						if (!multiplier[target]) {
							multiplier[target] = {
								hp: 1,
								atk: 1,
								def: 1,
								res: 0,
								aspd: 1,
								ms: 1,
								range: 1,
								weight: 0,
							};
						}
						for (const key in effect.mods) {
							if (key !== "special") {
								if (effect.mods[key][0] === "%") {
									multiplier[target][key] *=
										1 + parseInt(effect.mods[key].slice(1)) / 100;
								} else {
									multiplier[target][key] = effect.mods[key];
								}
							} else {
								if (!other_mods[target]) {
									other_mods[target] = {};
								}
								setOtherMods(other_mods[target], effect.mods.special);
							}
						}
					}
				}
			}
		}
		setSpecialMods(other_mods);
		setMultipliers(multiplier);
		setTotalRisk(selected.reduce((prev, curr) => prev + (curr.rank ?? 0), 0));
	}, [selected]);

	const resetSelected = () => {
		setSelected(
			selected.map((item) => {
				return {
					category: item.category,
					selected: false,
					option: "",
					target: "",
					tooltip: "",
					effect: [],
					rank: 0,
				};
			})
		);
	};

	const rank = [1, 2, 3];

	const [toggleRankColor, setToggleRankColor] = useState(false);
	const [showGrid, setShowGrid] = useState(false);
	const [stickyTable, setStickyTable] = useState(false);

	const options = {
		root: null,
		rootMargin: "0px",
		threshold: 1,
	};

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
			{mapConfig.ccType === "perma" ? (
				<>
					<div
						className={`md:w-full md:max-w-[900px] ${
							stickyTable ? "sticky top-0 z-10" : ""
						}`}
					>
						<div className="w-[100vw] md:w-full flex flex-wrap place-content-end mb-1 gap-x-1">
							<button
								onClick={() => setStickyTable(!stickyTable)}
								className={`text-xs font-semibold text-center py-1 px-2 border rounded-lg text-black ${
									stickyTable
										? "bg-gray-400 border-transparent"
										: "border-gray-400 bg-white"
								}`}
							>
								{language === "jp" ? "テーブル固定" : "Anchor Table"}
							</button>
							<button
								onClick={() => setShowGrid(!showGrid)}
								className={`text-xs font-semibold text-center py-1 px-2 border rounded-lg text-black ${
									showGrid
										? "bg-gray-400 border-transparent"
										: "border-gray-400 bg-white"
								}`}
							>
								{language === "jp" ? "グリッド表示" : "Toggle Grids"}
							</button>
							<button
								onClick={() => setToggleRankColor(!toggleRankColor)}
								className={`text-xs font-semibold text-center py-1 px-2 border rounded-lg text-black  ${
									toggleRankColor
										? "bg-gray-400 border-transparent"
										: "border-gray-400 bg-white "
								}`}
							>
								{language === "jp" ? "ランク色表示" : "Toggle Color"}
							</button>
						</div>
						<div
							className={`flex flex-wrap flex-col w-[100vw] md:w-full h-[214px] md:max-w-[900px] overflow-x-scroll overflow-y-hidden select-none relative`}
						>
							<div className="bg-[#545753] lg:sticky left-0 z-10 border-x border-gray-700">
								{rank.map((num) => (
									<div
										className={`  min-w-[50px] max-w-[100px] h-[65px] flex items-center `}
										key={`rank${num}`}
									>
										<div className="leading-[10px] mx-[4px]">
											<p className="text-[10px] text-gray-200 mb-1">
												Contigency <br /> Level
											</p>
											<Risk_triangle risk={num} />
										</div>
										<span className="text-white text-[50px] mr-[2px] font-normal font-sans">
											{num}
										</span>
									</div>
								))}
							</div>
							{ccConfig.map((category) =>
								category[`options`].map((option) => (
									<div
										className={`${
											showGrid ? "border-[1px]" : ""
										} border-collapse w-[65px] h-[65px] p-[1.5px] ${
											option?.img !== undefined ? "active:brightness-75" : ""
										}  ${
											toggleRankColor
												? getRankColor(option.rank)
												: "bg-[#90928f]"
										}`}
										key={option.img}
									>
										{Object.keys(option).includes("img") ? (
											<button
												type="button"
												onClick={() => handleClick(category, option)}
											>
												<Image
													src={`/images/cc_buttons/${option.img}.png`}
													alt={`${option.img}`}
													width="65px"
													height="65px"
													className={`${toggleOptionColor(
														category.category,
														option.img
													)}`}
												/>{" "}
											</button>
										) : null}
									</div>
								))
							)}
						</div>
					</div>
				</>
			) : null}
			<div
				id="CC-container"
				className={`${
					mapConfig.ccType === "perma" ? "w-[100vw] md:w-[900px]" : "min-w-min"
				} ${fontThemes[language]}`}
			>
				{mapConfig.ccType === "daily" ? (
					<Daily_buttons
						ccConfig={ccConfig}
						handleClick={handleClick}
						toggleOptionColor={toggleOptionColor}
						getRankColor={getRankColor}
						language={language}
					/>
				) : null}

				<Selected_options selected={selected} ccType={mapConfig.ccType} />
				<div className="flex flex-wrap border border-gray-800 w-[100vw] overflow:hidden md:w-full h-[50px] max-w-[900px] py-2 mb-2 select-none place-items-center bg-[#292929]">
					<div
						className="flex flex-wrap bg-white border rounded border-gray-800 mx-1 px-1 h-[80%] cursor-pointer active:bg-gray-400"
						onClick={resetSelected}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="black"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
							/>
						</svg>
						<p className="font-semibold text-black">
							{language === "jp" ? "クリア" : "Clear"}
						</p>
					</div>
					<div className="flex flex-wrap flex-col px-2 h-[110%] border-r-2 border-r-black leading-[16px] text-white">
						<div className="w-full">
							<p className="text-[10px] ">危機等級</p>
						</div>
						<div className="w-full">
							<p className="text-right text-[20px]">{totalRisk}</p>
						</div>
					</div>
				</div>
			</div>

			<EnemySimple
				mapConfig={mapConfig}
				multipliers={multipliers}
				specialMods={specialMods}
				language={language}
				device={device}
				fontThemes={fontThemes}
				enemies={mapConfig.enemies}
			/>
		</Layout>
	);
}
