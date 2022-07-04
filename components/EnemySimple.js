/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { parseRemarks } from "@/lib/parseRemarks";
import { useState, useEffect } from "react";
import { parseType } from "../lib/parseType";
import { parseAtkType, setOtherMods, getModdedStats } from "../lib/parseStats";
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
		{ key: "lifepoint", show: false },
		{ key: "remarks", show: true },
	]);
	const [multipliers, setMultipliers] = useState({
		ALL: {},
	});
	const [specialMods, setSpecialMods] = useState({});
	console.log("spMods", specialMods);
	console.log("mul", multipliers);

	const { selectedHardRelic, selectedNormalRelic, hallucinations } =
		useAppContext();

	const langPack = require(`../lang/${language}.json`);

	const textAlign = (stat) => {
		switch (stat) {
			case "type":
			case "atk":
			case "remarks":
			case "def":
				return "text-left px-[5.5px]";

			default:
				return "text-center";
		}
	};

	const getMinWidth = (stat) => {
		switch (stat) {
			case "type":
				return "min-w-[93px] md:min-w-min lg:px-2";
			case "atk":
			case "hp":
			case "def":
				return "min-w-[80px] md:min-w-min lg:px-2";
			case "remarks":
				return "min-w-[300px]";
			default:
				return "min-w-[50px]";
		}
	};

	const calculate = (enemy, stats, stat, row) => {
		let totalMultiplier = 1;
		let base_stat = enemy["stats"][stats][stat];
		switch (stat) {
			case "aspd":
				if (
					multipliers?.["ALL"]?.aspd !== undefined &&
					multipliers?.["ALL"]?.aspd > 1
				) {
					totalMultiplier += multipliers?.["ALL"]?.aspd - 1;
				}
				if (
					multipliers?.[enemy.id]?.aspd !== undefined &&
					multipliers?.[enemy.id]?.aspd > 1
				) {
					totalMultiplier += multipliers?.[enemy.id]?.aspd - 1;
				}
				if (
					enemy.type.includes("Melee") &&
					multipliers.hasOwnProperty("Melee")
				) {
					totalMultiplier += multipliers?.Melee?.aspd - 1;
				}
				if (
					enemy.type.includes("Ranged") &&
					multipliers.hasOwnProperty("Ranged")
				) {
					totalMultiplier += multipliers?.Ranged?.aspd - 1;
				}
				if (enemy.format === "prisoner" && row === 0) {
					if (specialMods[enemy.id]?.imprisoned?.hasOwnProperty("aspd")) {
						return (
							Math.ceil(
								(enemy["stats"][stats].aspd / totalMultiplier) *
									(1 - specialMods[enemy.id].imprisoned.aspd) *
									100
							) / 100
						);
					}
					return (
						Math.ceil(
							(enemy["stats"][stats].aspd / totalMultiplier) *
								(1 - enemy.imprisoned.aspd) *
								100
						) / 100
					);
				}
				if (enemy.format === "powerup" && row === 1) {
					if (specialMods[enemy.id]?.powerup?.hasOwnProperty("aspd")) {
						totalMultiplier += specialMods[enemy.id]?.powerup.aspd - 1;
					} else {
						totalMultiplier += enemy.powerup.aspd - 1;
					}
				}
				if (enemy.format === "multiform") {
				}
				return Math.ceil((base_stat / totalMultiplier) * 100) / 100;

			case "res":
			case "weight":
				let fixedIncValue = 0;
				if (
					enemy.type.includes("Melee") &&
					multipliers.hasOwnProperty("Melee")
				) {
					fixedIncValue += multipliers.Melee[stat];
				}
				if (
					enemy.type.includes("Ranged") &&
					multipliers.hasOwnProperty("Ranged")
				) {
					fixedIncValue += multipliers.Ranged[stat];
				}
				if (enemy.format === "prisoner" && row !== 0) {
					fixedIncValue += enemy.released?.[stat] ?? 0;
				}
				return Math.min(
					100,
					+base_stat +
						(multipliers?.["ALL"]?.[stat] ?? 0) +
						(multipliers?.[enemy.id]?.[stat] ?? 0) +
						fixedIncValue
				);

			default:
				if (enemy.format === "multiform") {
					if (enemy.forms[row].hasOwnProperty(stat)) {
						base_stat = parseMultiformMods(
							enemy["forms"][row],
							stat,
							base_stat
						);
					}
				}
				const moddedStats =
					(+base_stat +
						(multipliers?.["ALL"]?.[`fixed-${stat}`] ?? 0) +
						(multipliers?.[enemy.id]?.[`fixed-${stat}`] ?? 0)) *
					(multipliers?.["ALL"]?.[stat] ?? 1) *
					(multipliers?.[enemy.id]?.[stat] ?? 1) *
					(enemy.type.includes("Melee")
						? multipliers?.Melee?.[stat] ?? 1
						: enemy.type.includes("Ranged")
						? multipliers?.Ranged?.[stat] ?? 1
						: 1);
				if (enemy.format === "prisoner") {
					if (row === 0) {
						if (
							specialMods[enemy.id]?.imprisoned?.hasOwnProperty(stat) ||
							specialMods[enemy.id]?.imprisoned?.hasOwnProperty(`fixed-${stat}`)
						) {
							return (
								moddedStats *
									(specialMods[enemy.id].imprisoned[stat] ??
										enemy.imprisoned[stat] ??
										1) +
								(specialMods[enemy.id].imprisoned[`fixed-${stat}`] ?? 0)
							);
						}
						return (
							moddedStats * (enemy.imprisoned[stat] ?? 1) +
							(enemy.imprisoned[`fixed-${stat}`] ?? 0)
						);
					} else {
						if (specialMods[enemy.id]?.hasOwnProperty("release")) {
							return (
								moddedStats *
									(specialMods[enemy.id].released[stat] ??
										enemy.released[stat] ??
										1) +
								(specialMods[enemy.id].released[`fixed-${stat}`] ?? 0)
							);
						}
						return (
							moddedStats * (enemy.released[stat] ?? 1) +
							(enemy.released[`fixed-${stat}`] ?? 0)
						);
					}
				} else if (enemy.format === "powerup") {
					if (row === 1) {
						if (specialMods[enemy.id]?.hasOwnProperty("powerup")) {
							return (
								moddedStats *
									(specialMods[enemy.id].powerup[stat] ??
										enemy.powerup[stat] ??
										1) +
								(specialMods[enemy.id].powerup[`fixed-${stat}`] ?? 0)
							);
						}
						return (
							moddedStats * (enemy.powerup[stat] ?? 1) +
							(enemy.powerup[`fixed-${stat}`] ?? 0)
						);
					}
				}

				return moddedStats;
		}
	};

	const parseSpecial = (enemy, stat, stats, base_stat, row) => {
		const returnSpecArr = [];
		let specialModded = false;
		let skillMultiplier = 0;
		return enemy["stats"][stats].special.map((skill) => {
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

	const parseMultiformMods = (mods, stat, base_stat) => {
		const mod = mods[stat];
		// console.log(mod);
		if (mod.includes("%")) {
			base_stat *= 1 + parseInt(mod.slice(1)) / 100;
		}
		return base_stat;
	};

	const applyModifiers = (enemy, stats, stat, row) => {
		const numericStats = ["hp", "atk", "aspd", "range", "def", "res", "weight"];
		if (numericStats.includes(stat)) {
			return calculate(enemy, stats, stat, row);
		}
	};

	const toggleTableHeader = (header) => {
		setTableHeaders(
			tableHeaders.map((ele) => {
				if (ele.en === header) {
					ele.show = !ele.show;
				}
				return ele;
			})
		);
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

	const getAtk = (enemy, stats, base_stat) => {
		let returnArr = [];
		switch (enemy.id) {
			case "MR":
				const suffix = language === "en" ? "th atk/Phys" : "回目";
				for (let i = 1; i < 7; i++) {
					returnArr.push(
						<p>
							{Math.ceil(base_stat * (1 + 0.6 * i))} ({i}
							{suffix})
						</p>
					);
				}
				break;

			default:
				break;
		}
		return returnArr;
	};

	const renderRow = (enemy, count, entry, index, format) => {
		const numRowstoRender =
			format === "powerup" || format === "prisoner"
				? 2
				: format === "multiform"
				? enemy["forms"].length
				: 1;
		const returnArr = [];
		for (let row = 0; row < numRowstoRender; row++) {
			const arrayToMap =
				row === 0
					? tableHeaders
					: tableHeaders.filter(({ key }) =>
							format === "powerup" || format === "prisoner"
								? !powerupOddRows.includes(key)
								: !multiformOddRows.includes(key)
					  );
			returnArr.push(
				<>
					<tr className={`${index % 2 === 1 ? "bg-neutral-700" : ""}`}>
						{arrayToMap.map(({ key, show }) => {
							const stat = key;
							const statValue = applyModifiers(enemy, entry, stat, row);
							if (show) {
								return (
									<td
										className={`border border-gray-400 my-auto py-0 mx-2 md:max-w-[300px] ${textAlign(
											stat
										)} ${getMinWidth(stat)}  h-[75px] lg:text-md`}
										key={enemy.name + stat}
										rowSpan={
											row !== 0
												? 1
												: getRowSpan(
														enemy.format,
														stat,
														powerupOddRows,
														multiformOddRows,
														numRowstoRender
												  )
										}
									>
										{stat === "enemy" ? (
											<img
												src={`/enemy_icons/${enemy.id}.png`}
												alt={enemy.name["jp"]}
												height="75px"
												width="75px"
												className="select-none"
												loading="lazy"
											/>
										) : stat === "count" ? (
											<p>{count + (specialMods?.[enemy.id]?.count ?? 0)}</p>
										) : stat === "type" ? (
											parseType(enemy["type"], language)
										) : stat === "atk" ? (
											enemy.id !== "MR" ? (
												[
													<p>{`${Math.round(statValue)} (${
														format === "prisoner" && row === 1
															? enemy.released.normal_attack.hits !== 1
																? `x ${enemy.released.normal_attack.hits}`
																: ""
															: enemy.normal_attack.hits !== 1
															? `x ${enemy.normal_attack.hits}`
															: ""
													})`}</p>,
												].concat(
													parseSpecial(enemy, stat, entry, statValue, row)
												)
											) : (
												getAtk(enemy, entry, statValue)
											)
										) : stat === "remarks" ? (
											parseRemarks(enemy, specialMods, entry, row, language)
										) : stat === "range" ? (
											enemy["stats"][entry]["range"] === "0" ? (
												"0"
											) : (
												(Math.floor(statValue * 100) / 100).toFixed(2)
											)
										) : stat === "weight" || stat === "aspd" ? (
											[<p>{statValue}</p>].concat(
												parseSpecial(enemy, stat, entry, statValue, row)
											)
										) : (
											[<p>{Math.round(statValue)}</p>].concat(
												parseSpecial(enemy, stat, entry, statValue, row)
											)
										)}
									</td>
								);
							}
						})}
					</tr>
				</>
			);
		}
		return returnArr;
	};

	//! Render Table
	const renderEnemyStats = () => {
		const enemies =
			mode === "hard" && mapConfig.hasOwnProperty("hard_enemies")
				? mapConfig.hard_enemies
				: mapConfig.enemies;
		return enemies.map(({ id, count, stats }, index) => {
			//get enemydata file
			//map through enemydata
			let enemy = require(`../enemy_data/${id}.json`);
			// console.log(enemy["stats"][stats]);
			return renderRow(enemy, count, stats, index, enemy.format, language);
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

	const enemies = {};
	for (const { id, stats } of mapConfig.enemies) {
		const enemy = require(`/enemy_data/${id}.json`);
		enemies[enemy.id] = getModdedStats(enemy, stats, multipliers);
	}
	console.log(enemies);

	const filteredTableHeaders = tableHeaders.filter((ele) => ele.show);

	return (
		<>
			<div className="w-[100vw] md:w-full z-[50]">
				<div className="grid auto-cols-auto gap-x-2">
					{Object.keys(multipliers.ALL).map((ele) => (
						<span key={ele}>
							{ele}
							{multipliers.ALL[ele]}
						</span>
					))}
				</div>
				<div>
					<div>Filter</div>
					<div></div>
					<div className="">
						<div id="table-wrapper">
							<table>
								<colgroup></colgroup>
								<thead>
									<tr>
										{filteredTableHeaders.map(({ key }) => (
											<th key={key}>
												<span>{langPack.enemy_stats[key]}</span>
											</th>
										))}
									</tr>
								</thead>
								<tbody>
									{mapConfig.enemies.map(({ id, stats }) => {
										const enemy = require(`/enemy_data/${id}.json`);
										const format = enemy?.format ?? "normal";
										const maxRowSpan =
											format === "powerup" || format === "prisoner"
												? 2
												: format === "multiform"
												? enemy["forms"].length
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
												<tr key={id + row}>
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
																	<p className="whitespace-nowrap">
																		{moddedStats[stat]}
																		<span>
																			{parseAtkType(
																				enemy.normal_attack,
																				language,
																				langPack
																			)}
																		</span>
																	</p>
																);
																break;
															case "remarks":
																returnContainer = parseRemarks(
																	enemy,
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
															<td key={`${id}-${stat}`} rowSpan={rowSpan}>
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

				<table
					className={`border border-gray-400 border-solid w-[100vw] overflow-x-scroll md:overflow-x-auto md:mx-auto md:w-full ${fontThemes[language]}`}
				>
					<thead className="">
						<tr className="">
							{tableHeaders.map(({ key, show }) =>
								show ? (
									<th
										className={`border border-gray-400 border-solid py-0.5 px-1.5 md:min-w-[50px] ${
											language === "jp" ? "font-[500]" : ""
										}`}
										key={key}
									>
										{key === "aspd" ? key + " /s" : key === "res" ? "res" : key}
									</th>
								) : null
							)}
						</tr>
					</thead>
					{/* <tbody className="">{renderEnemyStats()}</tbody> */}
				</table>
			</div>
		</>
	);
}
