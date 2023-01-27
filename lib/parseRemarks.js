import { v4 as uuidv4 } from "uuid";
import { PHCS_BOSSES } from "@/data/phcs/misc";
import enemy_skills from "@/data/enemy_skills.json";

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

export const parseRemarks = (
	enemy,
	moddedStats,
	specialMods,
	entry,
	row,
	language
) => {
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
	if (!(enemy.format === "powerup" && row === 1)) {
		statusImmune.push(
			parseStatusImmune(langPack, enemy.status_immune, specialMods, enemy.id)
		);
	}
	for (const target of Object.keys(specialMods)) {
		if (enemy.id === target) {
			for (const skill of Object.keys(specialMods[target])) {
				if (skill === "extra") {
					extraArr.push(specialMods[target][skill].tooltip[language]);
				}
			}
		}
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
			if (enemy.powerup.state_name) {
				remarksArr.unshift(langPack[enemy.powerup.state_name]);
			}
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
			if (row !== 0) {
				if (language === "en") {
				} else {
					remarksArr.unshift(langPack.multiform_suffix.replace("#", row + 1));
				}
			}
			sortRemarks(
				enemy.stats[entry].forms[row].special,
				specialMods,
				enemy.id,
				language,
				othersArr,
				skillsArr
			);
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
		if (typeof remark === "object") {
			return (
				<div key={uuidv4()} className="py-1.5">
					{remark.map((line) => {
						if (line.includes("$")) return parseHighlight(line);
						return <p key={uuidv4()}>{line}</p>;
					})}
				</div>
			);
		} else {
			if (remark.includes("$")) return parseHighlight(remark);
			return (
				<p key={uuidv4()} className="py-1.5">
					{remark}
				</p>
			);
		}
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
	for (const skill_name of skills) {
		const modded_skill = specialMods?.[id]?.[skill_name];
		const skill = enemy_skills[skill_name];
		if (!skill) {
			console.log(`${id} with ${skill_name} is not found.`);
		}
		if (modded_skill) {
			if (modded_skill.type === "others")
				othersArr.push(modded_skill.tooltip[language]);
			else skillsArr.push(modded_skill.tooltip[language]);
		} else {
			if (skill.type === "others")
				othersArr.push(skill.tooltip.simple[language]);
			else skillsArr.push(skill.tooltip.simple[language]);
		}
	}
};

const parseHighlight = (text) => {
	const regexp = /\$/g;
	const array = [...text.matchAll(regexp)];
	// console.log(array);
	const returnArr = [];
	let lastSliceIndex = 0;
	for (let i = 0; i < array.length; i += 2) {
		const start = text.slice(lastSliceIndex, array[i].index);
		const mid = text.slice(array[i].index + 1, array[i + 1].index);
		const end = text.slice(array[i + 1].index + 1);

		start && returnArr.push(<span key={uuidv4()}>{start}</span>);
		returnArr.push(
			<span
				key={uuidv4()}
				className="text-rose-600 dark:text-red-400 font-medium"
			>
				{mid}
			</span>
		);
		i + 2 >= array.length
			? end && returnArr.push(<span key={uuidv4()}>{end}</span>)
			: (lastSliceIndex = array[i + 1].index + 1);
	}
	return (
		<p key={uuidv4()} className="">
			{returnArr}
		</p>
	);
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

const parseStatusImmune = (
	langPack,
	statusImmuneArr,
	specialMods,
	enemy_id
) => {
	//return a string
	if (
		statusImmuneArr.length === 0 &&
		!specialMods[enemy_id]?.hasOwnProperty("immune")
	) {
		return "";
	}
	const statusImmuneTexts = langPack.status_immune;
	if (statusImmuneArr.includes("ALL")) {
		return statusImmuneTexts.ALL;
	}
	return statusImmuneTexts.pre.concat(
		statusImmuneArr
			.map((status) => {
				return statusImmuneTexts[status];
			})
			.concat(
				specialMods[enemy_id]?.hasOwnProperty("immune")
					? specialMods[enemy_id].immune.map((status) => {
							return `$${statusImmuneTexts[status]}$`;
					  })
					: []
			)
			.join(statusImmuneTexts.separator),
		statusImmuneTexts.post
	);
};

export const parseSpecial = (
	enemy,
	format,
	stat,
	entry,
	moddedStat,
	row,
	specialMods,
	language
) => {
	let specialModded = false;
	if (format !== "multiform") {
		if (row === 0) {
			return getSkills(
				enemy.id,
				enemy.stats[entry].special,
				stat,
				moddedStat,
				specialMods,
				language
			);
		} else {
			switch (format) {
				case "prisoner":
					return getSkills(
						enemy.id,
						enemy.released.special,
						stat,
						moddedStat,
						specialMods,
						language
					);
				case "powerup":
					return getSkills(
						enemy.id,
						enemy.powerup.special.concat(enemy.stats[entry].special),
						stat,
						moddedStat,
						specialMods,
						language
					);
			}
		}
	} else {
		return getSkills(
			enemy.id,
			enemy.stats[entry].forms[row].special,
			stat,
			moddedStat,
			specialMods,
			language
		);
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
						<p className="py-1">
							<span className="text-red-400 font-semibold">
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
						<p className="py-1">
							{skill["fixed-dmg"]}
							{` (${skill.suffix[language]})`}
						</p>
					);
				}
				statValue = base_stat * skillMultiplier;
			}
			statValue += skill.fixedInc;
			return (
				<p className="py-1">
					<span
						className={`${specialModded ? "text-red-400 font-semibold" : ""} `}
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

const getSkills = (id, skills, stat, moddedStat, specialMods, language) => {
	return skills.map((skill_name) => {
		const skill = enemy_skills[skill_name];
		if (skill.type === stat) {
			const modded_skill = specialMods?.[id]?.[skill_name];
			const skillToRender = modded_skill ?? skill;
			if (skillToRender.hasOwnProperty("fixed")) {
				return (
					<p
						key={skill_name}
						className={`whitespace-nowrap ${stat === "atk" ? "" : "px-2"}`}
					>
						<span className={modded_skill && "text-red-400 font-medium"}>
							{skillToRender["fixed"]}
						</span>
						{` (${skill.suffix[language]})`}
					</p>
				);
			}
			const fixedInc = skillToRender.fixed_inc ?? 0;
			const multiplier = skillToRender.multiplier ?? 1;
			return (
				<p
					key={skill_name}
					className={`whitespace-nowrap ${stat === "atk" ? "" : "px-2"}`}
				>
					<span
						className={
							modded_skill &&
							modded_skill?.multiplier > skill.multiplier &&
							"text-red-400 font-medium"
						}
					>
						{Math.round((moddedStat + fixedInc) * multiplier)}
					</span>
					{`${stat === "atk" && skill?.hits > 1 ? ` x ${skill.hits}` : ""} (${
						skill.suffix[language]
					})`}
				</p>
			);
		}
	});
};
