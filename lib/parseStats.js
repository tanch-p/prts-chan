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
			return enemy.normal_attack[row];
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
	const multiplier = getEnemyMultiplier(enemy, multipliers, format, entry, row);
	const enemy_stats = {};
	for (const stat of STATS) {
		enemy_stats[stat] = calculateModdedStat(
			parseFloat(enemy.stats[entry][stat]),
			stat,
			multiplier[stat],
			multiplier?.[`fixed_${stat}`] ?? 0
		);
	}
	// console.log(enemy.id, enemy_stats);
	return enemy_stats;
};

//returns object with stat multipliers to be used for calculateModdedStat
const getEnemyMultiplier = (enemy, multipliers, format, entry, row) => {
	const multiplier = { ...multipliers.ALL };
	for (const target of Object.keys(multipliers)) {
		if (target !== "ALL") {
			if (isTarget(enemy.id, enemy.type, target)) {
				distillMods(multiplier, multipliers[target]);
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
				distillMods(multiplier, enemy.stats[entry].forms[row].mods);
				break;
		}
	}
	// console.log(enemy.id, multiplier);
	return multiplier;
};

const calculateModdedStat = (
	base_stat,
	stat,
	multiplier,
	fixed_value,
) => {
	base_stat += fixed_value;
	if (!multiplier) return base_stat;
	switch (stat) {
		case "aspd":
			if (multiplier < 1) {
				return Math.round(base_stat * (1 + multiplier) * 100) / 100;
			}
			return Math.round((base_stat / multiplier) * 100) / 100;
		case "range":
			return Math.round(base_stat * multiplier * 100) / 100;
		case "res":
		case "weight":
			return (base_stat += multiplier);
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
