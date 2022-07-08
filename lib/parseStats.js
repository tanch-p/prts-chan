import { v4 as uuidv4 } from "uuid";
import { PHCS_BOSSES } from "@/data/phcs/misc";

const STATS = [
	"hp",
	"atk",
	"aspd",
	"range",
	"def",
	"res",
	"weight",
	"ms",
	"lifepoint",
];

export const getAtkType = (enemy, format, row) => {
	switch (format) {
		case "prisoner":
			return row === 0 ? enemy.normal_attack : enemy.released.normal_attack;
		case "multiform":
			return enemy.normal_attack;
		default:
			return enemy.normal_attack;
	}
};

export const parseAtkType = (normal_attack, language, langPack) => {
	const { atk_type, hits } = normal_attack;

	const numHits = hits === 1 ? "" : `x ${hits}`;
	const atkType = "(".concat(
		atk_type
			.map((ele, index) => {
				const separator = language === "en" ? "/" : "・";
				return (index !== 0 ? separator : "") + langPack[ele];
			})
			.join(""),
		")"
	);
	return numHits.concat(" ", atkType);
};

export const setOtherMods = (other_mods, obj) => {
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

/*
ALL + others -> distill into enemy ID
*/

//returns enemy object with modded stats
export const getModdedStats = (enemy, entry, multipliers, format, row) => {
	const multiplier = getEnemyMultiplier(enemy, multipliers, format, row);
	const enemy_stats = {};
	for (const stat of STATS) {
		enemy_stats[stat] = calculateModdedStat(
			enemy.stats[entry][stat],
			stat,
			multiplier[stat],
			multiplier?.[`fixed-${stat}`] ?? 0
		);
	}
	// console.log(enemy.id, enemy_stats);
	return enemy_stats;
};

//returns object with stat multipliers to be used for calculateModdedStat
const getEnemyMultiplier = (enemy, multipliers, format, row) => {
	const multiplier = { ...multipliers.ALL };
	for (const target of Object.keys(multiplier)) {
		if (target !== "ALL") {
			if (isTarget(enemy.id, enemy.type, target)) {
				distillMods(multiplier, multiplier[target]);
			}
		}
	}
	if (format !== "normal") {
		switch (format) {
			case "prisoner":
				if (row === 0) {
					//imprisoned debuffs
					distillMods(multiplier, enemy.imprisoned.mods);
				} else {
					//released buffs
					distillMods(multiplier, enemy.released.mods);
				}
				break;

			case "powerup":
				if (row === 1) {
					distillMods(multiplier, enemy.powerup.mods);
				}
				break;
			case "multiform":
				break;
		}
	}
	return multiplier;
};

const calculateModdedStat = (base_stat, stat, multiplier, fixed_value) => {
	base_stat = +base_stat + fixed_value;
	if (!multiplier) return base_stat;
	switch (stat) {
		case "aspd":
			if (multiplier < 1) {
				return Math.round(base_stat * (1 + multiplier) * 100) / 100;
			}
			return Math.round((base_stat / multiplier) * 100) / 100;
		case "res":
		case "weight":
			return (base_stat = +base_stat + multiplier);
		default:
			return Math.round(base_stat * multiplier);
	}
};

const distillMods = (multiplier, mods) => {
	for (const stat in mods) {
		const value = mods[stat];
		if (!multiplier.hasOwnProperty(stat)) {
			multiplier[stat] = value;
		} else {
			switch (stat) {
				case "res":
				case "weight":
					multiplier[stat] += value;
					break;
				default:
					multiplier[stat] *= value;
					break;
			}
		}
	}
	return multiplier;
};

const isTarget = (id, type, target) => {
	switch (target) {
		case "ranged":
		case "melee":
			return type.includes(target);
		case "phcs_boss":
			return PHCS_BOSSES.includes(id);
		case "not_phcs_boss":
			return !PHCS_BOSSES.includes(id);
		default:
			return target === id;
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
			if (enemy.type.includes("Melee") && multipliers.hasOwnProperty("Melee")) {
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
			if (enemy.type.includes("Melee") && multipliers.hasOwnProperty("Melee")) {
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
					base_stat = parseMultiformMods(enemy["forms"][row], stat, base_stat);
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
