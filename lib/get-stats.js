import { v4 as uuidv4 } from "uuid";

export const parseAtkType = (atk_type, language, langPack) => {
	return atk_type
		.map((ele, index) => {
			const separator = language === "en" ? "/" : "・";
			return (index !== 0 ? separator : "") + langPack[ele];
		})
		.join("");
};

