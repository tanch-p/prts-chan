import fs from "fs";
import path from "path";

const stagesDirectory = path.join(process.cwd(), "stages");

export function getAllStageIds(folder) {
	const fileNames = fs.readdirSync(stagesDirectory.concat(`/${folder}/`));
	return fileNames.map((fileName) => {
		return {
			params: {
				name: fileName.replace(/\.json$/, ""),
				folder: folder,
			},
		};
	});
}

export async function getStageData(name,folder) {
	const fullPath = path.join(stagesDirectory, `/${folder}/`, `${name}.json`);
	const fileContents = fs.readFileSync(fullPath);

	const mapConfig = JSON.parse(fileContents);
	// console.log("map Config", mapConfig);

	// Combine the data with the id and contentHtml
	return {
		name,
		mapConfig,
	};
}
