/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { parseRemarks } from "@/lib/parseRemarks";
import { useState, useEffect } from "react";
import { parseType } from "../lib/parseType";
import {
	getAtkType,
	parseAtkType,
	setOtherMods,
	getModdedStats,
} from "../lib/parseStats";
import { useAppContext } from "context/AppContext";
import { v4 as uuidv4 } from "uuid";

const powerupOddRows = [
	"enemy",
	"count",
	"type",
	"hp",
	"weight",
	"range",
	"lifepoint",
];
const multiformOddRows = ["enemy", "count", "type", "weight", "lifepoint"];

export default function EnemySimple({
	mapConfig,
	language,
	device,
	fontThemes,
	mode = "normal",
}) {
	const [tableHeaders, setTableHeaders] = useState([
		{ key: "enemy", show: true },
		{ key: "type", show: true },
		{ key: "hp", show: true },
		{ key: "atk", show: true },
		{ key: "aspd", show: true },
		{ key: "range", show: true },
		{ key: "def", show: true },
		{ key: "res", show: true },
		{ key: "weight", show: true },
		{ key: "ms", show: false },
		{ key: "lifepoint", show: true },
		{ key: "remarks", show: true },
	]);
	const [multipliers, setMultipliers] = useState({
		ALL: { hp: 1, atk: 1, def: 1, res: 0, aspd: 1, ms: 1, range: 1, weight: 0 },
	});
	const [specialMods, setSpecialMods] = useState({});
	// console.log("spMods", specialMods);
	// console.log("mul", multipliers);

	const {
		selectedHardRelic,
		selectedNormalRelic,
		hallucinations,
		floor,
		setFloor,
	} = useAppContext();

	const langPack = require(`../lang/${language}.json`);

	const parseSpecial = (enemy, format, stat, entry, moddedStat, row) => {
		let specialModded = false;
		if (format !== "multiform") {
			if (row === 0) {
				return getSkills(enemy.stats[entry].special, stat, moddedStat);
			} else {
				switch (format) {
					case "prisoner":
						return getSkills(enemy.released.special, stat, moddedStat);
					case "powerup":
						return getSkills(enemy.powerup.special, stat, moddedStat);
				}
			}
		} else {
			return;
		}

		return enemy["stats"][entry].special.map((skill) => {
			let statValue = 0;
			if (skill.type === stat) {
				skillMultiplier = skill.multiplier;
				// console.log(skill.multiplier, enemy.id);
				if (enemy.format === "multiform") {
					const multi_skill_index = enemy.forms[row].special.findIndex(
						(ele) => ele.name === skill.name
					);
					if (multi_skill_index !== -1) {
						skillMultiplier =
							enemy.forms[row].special[multi_skill_index].multiplier;
					}
				}

				if (
					specialMods[enemy.id] &&
					specialMods[enemy.id]?.hasOwnProperty(skill.name)
				) {
					if (specialMods[enemy.id][skill.name].hasOwnProperty("fixed-dmg")) {
						return (
							<p>
								<span className="text-rose-600 font-semibold">
									{specialMods[enemy.id][skill.name]["fixed-dmg"]}
								</span>

								{` (${skill.suffix[language]})`}
							</p>
						);
					}
					const specialModMultiplier =
						specialMods[enemy.id][skill.name].multiplier;
					statValue =
						specialModMultiplier[0] === "%"
							? base_stat *
							  (skillMultiplier *
									(1 + parseInt(specialModMultiplier.slice(1)) / 100))
							: base_stat * (skillMultiplier + specialModMultiplier);
					if (statValue !== base_stat * skillMultiplier) {
						specialModded = true;
					}
				} else {
					if (skill.hasOwnProperty("fixed-dmg")) {
						return (
							<p>
								{skill["fixed-dmg"]}
								{` (${skill.suffix[language]})`}
							</p>
						);
					}
					statValue = base_stat * skillMultiplier;
				}
				statValue += skill.fixedInc;
				return (
					<p>
						<span
							className={`${
								specialModded ? "text-rose-600 font-semibold" : ""
							} `}
						>
							{Math.round(statValue)}
						</span>
						{` (${
							specialMods?.[enemy.id]?.[skill.name]?.suffix?.[language] ??
							skill.suffix[language]
						})`}
					</p>
				);
			}
		});
	};

	const getSkills = (skills, stat, moddedStat) => {
		return skills.map((skill) => {
			if (skill.type === stat) {
				if (skill.hasOwnProperty("fixed")) {
					return (
						<p className={`whitespace-nowrap ${stat === "atk" ? "" : "px-2"}`}>
							{skill["fixed"]}
							{` (${skill.suffix[language]})`}
						</p>
					);
				}
				const fixedInc = skill.fixed_inc ?? 0;
				const multiplier = skill.multiplier ?? 1;
				return (
					<p className={`whitespace-nowrap ${stat === "atk" ? "" : "px-2"}`}>
						{Math.round((moddedStat + fixedInc) * multiplier)}
						{` (${skill.suffix[language]})`}
					</p>
				);
			}
		});
	};

	const updateMultiplier = () => {
		const distill = (holder, effects) => {
			effects.forEach((effect) => {
				for (const target of effect.targets) {
					if (!holder[target]) {
						holder[target] = {
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
								holder[target][key] *=
									parseInt(effect.mods[key].slice(1)) / 100;
							} else {
								holder[target][key] = effect.mods[key];
							}
						} else {
							if (!other_mods[target]) {
								other_mods[target] = {};
							}
							setOtherMods(other_mods[target], effect.mods.special);
						}
					}
				}
			});
		};

		const multiplierHolder = {
			ALL: {
				hp: 1,
				atk: 1,
				def: 1,
				res: 0,
				aspd: 1,
				ms: 1,
				range: 1,
				weight: 0,
			},
		};
		const other_mods = {};
		if (mode === "hard") {
			const effects = mapConfig.hard_mods;
			distill(multiplierHolder, effects);
		}
		for (const hallu of hallucinations) {
			distill(multiplierHolder, hallu.effects);
		}
		for (const relic of selectedHardRelic) {
			distill(multiplierHolder, relic.effects);
		}
		for (const relic of selectedNormalRelic) {
			distill(multiplierHolder, relic.effects);
		}

		setSpecialMods({ ...specialMods, ...other_mods });
		setMultipliers(multiplierHolder);
	};
	useEffect(() => {
		updateMultiplier();
	}, [hallucinations, selectedHardRelic, selectedNormalRelic]);

	useEffect(() => {
		if (!mapConfig.floors.includes(floor))
			setFloor(Math.min(...mapConfig.floors));
	}, []);

	const enemies =
		mode === "hard"
			? mapConfig.hard_enemies ?? mapConfig.enemies
			: mapConfig.enemies;

	const filteredTableHeaders = tableHeaders.filter((ele) => ele.show);

	return (
		<>
			<div className="">
				{/* <div className="grid auto-cols-auto gap-x-2">
					{Object.keys(multipliers.ALL).map((ele) => (
						<span key={ele}>
							{ele}
							{multipliers.ALL[ele]}
						</span>
					))}
				</div> */}
				<div>
					{/* <div>Filter</div> */}

					<div className="">
						<div
							id="table-wrapper"
							className="overflow-x-auto w-screen md:w-full"
						>
							<table className="border border-gray-400 border-collapse w-max md:w-full">
								<colgroup></colgroup>
								<thead>
									<tr>
										{filteredTableHeaders.map(({ key }) => (
											<th
												key={key}
												className="border border-gray-400 border-solid py-0.5 px-1.5 md:min-w-[50px]"
											>
												<span>{langPack.enemy_stats[key]}</span>
											</th>
										))}
									</tr>
								</thead>
								<tbody>
									{enemies.map(({ id, stats }, index) => {
										const enemy = require(`/enemy_data/${id}.json`);
										const format = enemy?.format ?? "normal";
										const maxRowSpan =
											format === "powerup" || format === "prisoner"
												? 2
												: format === "multiform"
												? enemy.stats[stats].forms.length
												: 1;
										const trArr = [];
										for (let row = 0; row < maxRowSpan; row++) {
											const statsToMap =
												row === 0
													? filteredTableHeaders
													: filteredTableHeaders.filter(({ key }) =>
															format === "powerup" || format === "prisoner"
																? !powerupOddRows.includes(key)
																: !multiformOddRows.includes(key)
													  );
											const moddedStats = getModdedStats(
												enemy,
												stats,
												multipliers,
												format,
												row
											);
											trArr.push(
												<tr
													key={id + row}
													className={`${
														index % 2 === 1 ? " bg-[#333333]" : ""
													}`}
												>
													{statsToMap.map(({ key: stat }) => {
														let rowSpan = 1;
														if (format !== "normal")
															rowSpan = getRowSpan(format, stat, maxRowSpan);
														let returnContainer = "";
														switch (stat) {
															case "enemy":
																returnContainer = (
																	<img
																		src={`/enemy_icons/${id}.png`}
																		alt={enemy.name["jp"]}
																		height="75px"
																		width="75px"
																		className="select-none"
																		loading="lazy"
																	/>
																);
																break;
															case "type":
																returnContainer = parseType(
																	enemy.type,
																	language
																);
																break;
															case "atk":
																returnContainer = (
																	<>
																		<p className="whitespace-nowrap">
																			{moddedStats[stat]}
																			<span>
																				{parseAtkType(
																					getAtkType(enemy, format, row),
																					language,
																					langPack
																				)}
																			</span>
																		</p>
																		{parseSpecial(
																			enemy,
																			format,
																			stat,
																			stats,
																			moddedStats[stat],
																			row
																		)}
																	</>
																);
																break;
															case "def":
															case "res":
															case "aspd":
															case "range":
															case "ms":
																returnContainer = (
																	<>
																		<p>
																			{moddedStats[stat]}
																			{parseSpecial(
																				enemy,
																				format,
																				stat,
																				stats,
																				moddedStats[stat],
																				row
																			)}
																		</p>
																	</>
																);
																break;
															case "remarks":
																returnContainer = parseRemarks(
																	enemy,
																	moddedStats,
																	specialMods,
																	stats,
																	row,
																	language
																);
																break;
															default:
																returnContainer = <p>{moddedStats[stat]}</p>;
																break;
														}
														return (
															<td
																key={`${id}-${stat}`}
																rowSpan={rowSpan}
																className={`border border-gray-400 h-[65px] ${textAlign(
																	stat
																)}`}
															>
																<div>{returnContainer}</div>
															</td>
														);
													})}
												</tr>
											);
										}
										return trArr;
									})}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

const textAlign = (stat) => {
	switch (stat) {
		case "hp":
			return "text-center px-3";
		case "type":
		case "atk":
			return "text-left px-3";

		case "remarks":
			return "text-left px-2 py-2";
		default:
			return "text-center";
	}
};

const getRowSpan = (format, stat, maxRowSpan) => {
	switch (format) {
		case "powerup":
		case "prisoner":
			return powerupOddRows.includes(stat) ? maxRowSpan : 1;
		case "multiform":
			return multiformOddRows.includes(stat) ? maxRowSpan : 1;
		default:
			return 1;
	}
};
