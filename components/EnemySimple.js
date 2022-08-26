/* eslint-disable @next/next/no-img-element */
import { parseRemarks, parseSpecial } from "@/lib/parseRemarks";
import { useState } from "react";
import { parseType } from "../lib/parseType";
import { getAtkType, parseAtkType, getModdedStats } from "../lib/parseStats";
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
	multipliers,
	specialMods,
	language,
	device,
	fontThemes,
	enemies,
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
	// console.log("spMods", specialMods);
	// console.log("mul", multipliers);

	const langPack = require(`../lang/${language}.json`);

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
							className="overflow-x-auto md:overflow-visible w-screen md:w-full"
						>
							<table className="border border-gray-400 border-collapse  w-max md:w-full">
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
																			row,
																			specialMods,
																			language
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
																				row,
																				specialMods,
																				language
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
