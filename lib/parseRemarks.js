import { v4 as uuidv4 } from "uuid";
import { PHCS_BOSSES } from "@/data/phcs/misc";

/* 
!Priority of Remarks to show
1. Phase (Powerup/Form)
2. Status Immunity
3. Extra 
4. Others
5. Skills
*/

/*
! Flow
1. Consolidate remarks in plain strings
Parse highlights/tooltips

? If CC mods have skill, 
for simple cases, do replacement
else do value replacement with parseValueRemark
*/

export const parseRemarks = (enemy, moddedStats, specialMods, entry, row, language) => {
	const statusImmune = [];
	const extraArr = [];
	const othersArr = [];
	const skillsArr = [];
	const remarksArr = [];

	const langPack = require(`../lang/${language}.json`);
	const has_true_dmg_inc = specialMods?.ALL?.hasOwnProperty("true_dmg_inc");
	const survival_mode = specialMods?.not_phcs_boss?.survival_mode;
	if (survival_mode && !PHCS_BOSSES.includes(enemy.id)) {
		const remark = survival_mode.tooltip[language];
		let value = survival_mode.value;
		if (has_true_dmg_inc) {
			value *= 2.5;
		}
		extraArr.push(parseValueRemark(remark, value));
	}
	switch (enemy.format) {
		case "prisoner":
			if (row === 0) {
				sortRemarks(
					enemy.imprisoned.special,
					specialMods,
					enemy.id,
					language,
					othersArr,
					skillsArr
				);
				break;
			}
			remarksArr.unshift(langPack.prisoner_release);
			sortRemarks(
				enemy.released.special,
				specialMods,
				enemy.id,
				language,
				othersArr,
				skillsArr
			);
			break;
		case "powerup":
			if (row === 0) {
				sortRemarks(
					enemy.stats[entry].special,
					specialMods,
					enemy.id,
					language,
					othersArr,
					skillsArr
				);
				break;
			}
			remarksArr.unshift(langPack[enemy.powerup.state_name]);
			sortRemarks(
				enemy.powerup.special,
				specialMods,
				enemy.id,
				language,
				othersArr,
				skillsArr
			);
			break;
		case "multiform":
			break;
		default:
			sortRemarks(
				enemy.stats[entry].special,
				specialMods,
				enemy.id,
				language,
				othersArr,
				skillsArr
			);
	}

	remarksArr.push(...statusImmune, ...extraArr, ...othersArr, ...skillsArr);
	return remarksArr.map((remark) => {
		if (remark.includes("$")) return parseHighlight(remark);
		return (
			<p key={uuidv4()} className="py-1">
				{remark}
			</p>
		);
	});
};

const sortRemarks = (
	skills,
	specialMods,
	id,
	language,
	othersArr,
	skillsArr
) => {
	for (const skill of skills) {
		const modded_skill = specialMods?.[id]?.[skill.name];
		if (modded_skill) {
		}
		if (skill.type === "others")
			othersArr.push(...skill.tooltip.simple[language]);
		else skillsArr.push(...skill.tooltip.simple[language]);
	}
};

const parseHighlight = (text) => {
	const regexp = /\$/g;
	const array = [...text.matchAll(regexp)];
	// console.log(array);
	const returnArr = [];
	let lastSliceIndex = 0;
	for (let i = 0; i < array.length; i += 2) {
		returnArr.push(<span>{text.slice(lastSliceIndex, array[i].index)}</span>);
		returnArr.push(
			<span className="text-rose-600 dark:text-red-400 font-semibold">
				{text.slice(array[i].index + 1, array[i + 1].index)}
			</span>
		);
		i + 2 >= array.length
			? returnArr.push(<span>{text.slice(array[i + 1].index + 1)}</span>)
			: (lastSliceIndex = array[i + 1].index + 1);
	}
	// console.log("returnArr", returnArr);
	return <p>{returnArr}</p>;
};

const getTooltipMultiplier = (
	tooltip,
	originalMultiplier,
	specialMultiplier
) => {
	// console.log(originalMultiplier);
	return tooltip.replace(
		"#mult",
		`${Math.round((originalMultiplier + specialMultiplier) * 100) / 100}`
	);
};

const parseValueRemark = (remark, value) => {
	return remark.replace("#val", `${value}`);
};
