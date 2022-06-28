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

export const parseAtkType = (atk_type, language, langPack) => {
	return atk_type
		.map((ele, index) => {
			const separator = language === "en" ? "/" : "・";
			return (index !== 0 ? separator : "") + langPack[ele];
		})
		.join("");
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
export const getModdedStats = (enemy, entry, multipliers) => {
	const multiplier = getEnemyMultiplier(enemy, multipliers);
	const enemy_stats = {};
	for (const stat of STATS) {
		enemy_stats[stat] = calculateModdedStat(
			enemy.stats[entry][stat],
			stat,
			multiplier[stat]
		);
	}
	// console.log(enemy.id, enemy_stats);
	return enemy_stats;
};

//returns object with stat multipliers to be used for calculateModdedStat
const getEnemyMultiplier = (enemy, multipliers) => {
	const multiplier = { ...multipliers.ALL };
	for (const target of Object.keys(multiplier)) {
		if (target !== "ALL") {
			if (isTarget(enemy.id, enemy.type, target)) {
				for (const stat in multiplier[target]) {
					const value = multiplier[target][stat];
					if (!multiplier.hasOwnProperty(stat)) {
						multiplier[stat] = value;
					} else {
						switch (stat) {
							case "res":
							case "weight":
								multiplier[stat] += value;
							default:
								multiplier[stat] *= value;
								break;
						}
					}
				}
			}
		}
	}
	return multiplier;
};

const calculateModdedStat = (base_stat, stat, multiplier, fixed_value) => {
	switch (stat) {
		case "aspd":
			return Math.round((base_stat / multiplier) * 100) / 100;
		case "res":
		case "weight":
			return (base_stat += multiplier);
		default:
			return Math.round(base_stat * multiplier);
	}
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
