import { v4 as uuidv4 } from "uuid";

export const parseAtkType = (atk_type, language, langPack) => {
	return atk_type
		.map((ele, index) => {
			const separator = language === "en" ? "/" : "・";
			return (index !== 0 ? separator : "") + langPack[ele];
		})
		.join("");
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