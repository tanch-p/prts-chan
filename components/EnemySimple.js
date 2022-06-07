import Image from "next/image";
import { getRemarks } from "./getStats";
import { useState } from "react";
import { parseType } from "./parseType";

export default function EnemySimple({
	mapConfig,
	multiplier,
	specialMods,
	language,
	device,
	fontThemes,
}) {
	const [tableHeaders, setTableHeaders] = useState([
		{ en: "enemy", jp: "敵", cn: "敌人", show: true },
		{
			en: "count",
			jp: "数",
			cn: "数量",
			show: true,
		},
		{ en: "type", jp: "属性", cn: "属性", show: true },
		{ en: "hp", jp: "HP", cn: "生命值", show: true },
		{ en: "atk", jp: "攻撃力", cn: "攻击力", show: true },
		{ en: "aspd", jp: "攻撃速度", cn: "攻击间隔", show: true },
		{ en: "range", jp: "攻撃範囲", cn: "攻击范围", show: true },
		{ en: "def", jp: "防御力", cn: "防御力", show: true },
		{ en: "mdef", jp: "術耐性", cn: "法术抗性", show: true },
		{ en: "weight", jp: "重量", cn: "重量", show: true },
		{ en: "remarks", jp: "備考", cn: "特殊", show: true },
	]);

	console.log("spMods", specialMods);
	console.log("mul", multiplier);

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
					multiplier?.["ALL"]?.aspd !== undefined &&
					multiplier?.["ALL"]?.aspd > 1
				) {
					totalMultiplier += multiplier?.["ALL"]?.aspd - 1;
				}
				if (
					multiplier?.[enemy.id]?.aspd !== undefined &&
					multiplier?.[enemy.id]?.aspd > 1
				) {
					totalMultiplier += multiplier?.[enemy.id]?.aspd - 1;
				}
				if (
					enemy.type.includes("Melee") &&
					multiplier.hasOwnProperty("Melee")
				) {
					totalMultiplier += multiplier?.Melee?.aspd - 1;
				}
				if (
					enemy.type.includes("Ranged") &&
					multiplier.hasOwnProperty("Ranged")
				) {
					totalMultiplier += multiplier?.Ranged?.aspd - 1;
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

			case "mdef":
			case "weight":
				let fixedIncValue = 0;
				if (
					enemy.type.includes("Melee") &&
					multiplier.hasOwnProperty("Melee")
				) {
					fixedIncValue += multiplier.Melee[stat];
				}
				if (
					enemy.type.includes("Ranged") &&
					multiplier.hasOwnProperty("Ranged")
				) {
					fixedIncValue += multiplier.Ranged[stat];
				}
				if (enemy.format === "prisoner" && row !== 0) {
					fixedIncValue += enemy.release?.[stat] ?? 0;
				}
				return (
					+base_stat +
					(multiplier?.["ALL"]?.[stat] ?? 0) +
					(multiplier?.[enemy.id]?.[stat] ?? 0) +
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
						(multiplier?.["ALL"]?.[`fixed-${stat}`] ?? 0) +
						(multiplier?.[enemy.id]?.[`fixed-${stat}`] ?? 0)) *
					(multiplier?.["ALL"]?.[stat] ?? 1) *
					(multiplier?.[enemy.id]?.[stat] ?? 1) *
					(enemy.type.includes("Melee")
						? multiplier?.Melee?.[stat] ?? 1
						: enemy.type.includes("Ranged")
						? multiplier?.Ranged?.[stat] ?? 1
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
									(specialMods[enemy.id].release[stat] ??
										enemy.release[stat] ??
										1) +
								(specialMods[enemy.id].release[`fixed-${stat}`] ?? 0)
							);
						}
						return (
							moddedStats * (enemy.release[stat] ?? 1) +
							(enemy.release[`fixed-${stat}`] ?? 0)
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
					if (enemy.forms[row].special.hasOwnProperty(skill.name)) {
						// console.log(row);
						skillMultiplier = enemy.forms[row].special[skill.name].multiplier;
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
		const numericStats = [
			"hp",
			"atk",
			"aspd",
			"range",
			"def",
			"mdef",
			"weight",
		];
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

	const getRowSpan = (
		format,
		stat,
		powerupArr,
		multiformArr,
		numRowstoRender
	) => {
		switch (format) {
			case "powerup":
			case "prisoner":
				return powerupArr.includes(stat) ? numRowstoRender : 1;
			case "multiform":
				return multiformArr.includes(stat) ? numRowstoRender : 1;
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

	const renderRow = (enemy, count, stats, index, format) => {
		const powerupOddRows = ["enemy", "count", "type", "hp", "weight", "range"];
		const multiformOddRows = ["enemy", "count", "type", "weight"];
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
					: tableHeaders.filter((ele) =>
							format === "powerup" || format === "prisoner"
								? !powerupOddRows.includes(ele.en)
								: !multiformOddRows.includes(ele.en)
					  );
			returnArr.push(
				<>
					<tr className={`${index % 2 === 1 ? "bg-neutral-100" : ""}`}>
						{arrayToMap.map((ele) => {
							const stat = ele.en;
							const statValue = applyModifiers(enemy, stats, stat, row);
							if (ele.show) {
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
													<p>{`${Math.round(statValue)} (${(format ===
														"prisoner" && row === 1
														? enemy.release.normal_attack.hits !== 1
															? `x ${enemy.release.normal_attack.hits}`
															: ""
														: enemy.normal_attack.hits !== 1
														? `x ${enemy.normal_attack.hits}`
														: ""
													).concat(
														format === "prisoner" && row === 1
															? enemy.release.normal_attack.type[language]
															: enemy.normal_attack.type[language]
													)})`}</p>,
												].concat(
													parseSpecial(enemy, stat, stats, statValue, row)
												)
											) : (
												getAtk(enemy, stats, statValue)
											)
										) : stat === "remarks" ? (
											getRemarks(
												enemy,
												specialMods,
												stats,
												language,
												"simple",
												row
											)
										) : stat === "range" ? (
											enemy["stats"][stats]["range"] === "0" ? (
												"0"
											) : (
												(Math.floor(statValue * 100) / 100).toFixed(2)
											)
										) : stat === "weight" || stat === "aspd" ? (
											[<p>{statValue}</p>].concat(
												parseSpecial(enemy, stat, stats, statValue, row)
											)
										) : (
											[<p>{Math.round(statValue)}</p>].concat(
												parseSpecial(enemy, stat, stats, statValue, row)
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
		return mapConfig.enemies.map(({ id, count, stats }, index) => {
			//get enemydata file
			//map through enemydata
			let enemy = require(`../enemy_data/${id}.json`);
			// console.log(enemy["stats"][stats]);
			return renderRow(enemy, count, stats, index, enemy.format);
		});
	};

	return (
		<>
			{device !== "mobile" ? (
				<button
					className={`text-xs font-semibold text-center py-1 px-2 my-1 border rounded-lg bg-gray-300`}
					onClick={() => {
						toggleTableHeader("count");
					}}
				>
					{tableHeaders[1].show
						? `${language === "jp" ? "数を表示しない" : "Hide Enemy Count"}`
						: `${language === "jp" ? "数を表示する" : `Show Enemy Count`}`}
				</button>
			) : null}

			<div className="w-[100vw] md:w-full overflow-x-scroll md:overflow-x-auto">
				<table
					className={`border border-gray-400 border-solid w-[100vw] overflow-x-scroll md:overflow-x-auto md:mx-auto md:w-full ${fontThemes[language]}`}
				>
					<thead className="">
						<tr className="">
							{tableHeaders.map((ele) =>
								ele.show ? (
									<th
										className={`border border-gray-400 border-solid py-0.5 px-1.5 md:min-w-[50px] ${
											language === "jp" ? "font-[500]" : ""
										}`}
										key={ele.en}
									>
										{ele.en === "aspd"
											? ele[language] + " /s"
											: ele[language] === "mdef"
											? "res"
											: ele[language]}
									</th>
								) : null
							)}
						</tr>
					</thead>
					<tbody className="">{renderEnemyStats()}</tbody>
				</table>
			</div>
		</>
	);
}
