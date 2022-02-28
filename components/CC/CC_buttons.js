import { useState, useEffect, useContext } from "react";
import Daily_buttons from "./Daily_buttons";
import Perma_buttons from "./Perma_buttons";
import Selected_options from "./Selected_options";

export default function CC_buttons({
	mapConfig,
	setMultiplier,
	setSpecialMods,
	language,
	device,
	fontThemes
}) {
	let ccConfig = require(`../../cc_config/${mapConfig.config}.json`);
	const [selected, setSelected] = useState([{}]);
	const [totalRisk, setTotalRisk] = useState(0);
	const [toggleRankColor, setToggleRankColor] = useState(false);
	const [showGrid, setShowGrid] = useState(false);

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

	const toggleOptionColor = (category, name, type = "perma") => {
		for (const item of selected) {
			if (item.category === category) {
				if (item.option === name) {
					return `bg-blue-500 ${type === "daily" ? "text-white" : ""}`;
				} else if (item.selected) {
					return `bg-rose-600 ${type === "daily" ? "text-white" : ""}`;
				} else {
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
			if (key !== "tooltip") {
				if (typeof obj[key] !== "object") {
					other_mods[key] = obj[key];
				} else {
					if (!other_mods[key]) {
						other_mods[key] = {};
					}
					setOtherMods(other_mods[key], obj[key]);
				}
			} else {
				other_mods.tooltip = obj.tooltip;
			}
		}
	};

	useEffect(() => {
		const multiplier = {
			ALL: { hp: 1, atk: 1, def: 1, mdef: 0, aspd: 1, ms: 1, weight: 0 },
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
								mdef: 0,
								aspd: 1,
								ms: 1,
								range: 1,
								weight: 0,
							};
						}
						for (const key in effect.mods) {
							if (key !== "special") {
								if (effect.mods[key][0] === "%") {
									multiplier[target][key] +=
										parseInt(effect.mods[key].slice(1)) / 100;
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
		setMultiplier(multiplier);
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

	return (
		<>
			<div
				id="CC-container"
				className={`${mapConfig.ccType === "perma" ? "w-[100vw] md:w-[900px]" : "min-w-min"} ${fontThemes[language]}`}
			>
				{mapConfig.ccType === "perma" ? (
					<div className="w-[100vw] md:w-full flex flex-wrap place-content-end mb-1">
						<button
							onClick={() => setShowGrid(!showGrid)}
							className={`text-xs font-semibold text-center py-1 px-2 border rounded-lg  ${
								showGrid ? "bg-gray-400" : "border-gray-400"
							}`}
						>
							{language==="jp" ? "グリッド表示" :"Toggle Grids"}
						</button>
						<button
							onClick={() => setToggleRankColor(!toggleRankColor)}
							className={`text-xs font-semibold text-center py-1 px-2 border rounded-lg  ${
								toggleRankColor ? "bg-gray-400" : "border-gray-400"
							}`}
						>
							{language==="jp" ? "ランク色表示" :"Toggle Color"}
						</button>
					</div>
				) : null}

				{mapConfig.ccType === "perma" ? (
					<Perma_buttons
						ccConfig={ccConfig}
						handleClick={handleClick}
						toggleOptionColor={toggleOptionColor}
						getRankColor={getRankColor}
						language={language}
						showGrid={showGrid}
						toggleRankColor={toggleRankColor}
					/>
				) : (
					<Daily_buttons
						ccConfig={ccConfig}
						handleClick={handleClick}
						toggleOptionColor={toggleOptionColor}
						getRankColor={getRankColor}
						language={language}
					/>
				)}
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
							stroke="currentcolor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
							/>
						</svg>
						<p className="font-semibold">{language === "jp" ? "クリア" : "Clear"}</p>
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
		</>
	);
}
