import fs from "fs";
import path from "path";

const stagesDirectory = path.join(process.cwd(), "stages");

export function getSortedStagesData() {
	console.log("running in stages.js");
	// Get file names under /posts
	const fileNames = fs.readdirSync(stagesDirectory);

	// let rawdata = fs.readFileSync("../stages/1-7.json");
	// let student = JSON.parse(rawdata);
	// console.log(student);

	const allStagesData = fileNames.map((fileName) => {
		// Remove ".md" from file name to get id
		const name = fileName.replace(/\.json$/, "");
		console.log("name", name);
		// Read markdown file as string
		const fullPath = path.join(stagesDirectory, fileName);
		const fileContents = fs.readFileSync(fullPath);

		// Use gray-matter to parse the post metadata section
		const stageJson = JSON.parse(fileContents);
		console.log("stageJson",stageJson);
		// Combine the data with the id
		return {
			name,
			stageJson: stageJson,
		};
	});
	return allStagesData.sort(({ name: a }, { name: b }) => {
		if (a < b) {
			return 1;
		} else if (a > b) {
			return -1;
		} else {
			return 0;
		}
	});
}

export function getAllStageIds() {
	const fileNames = fs.readdirSync(stagesDirectory);

	// Returns an array that looks like this:
	// [
	//   {
	//     params: {
	//       name: '1-7'
	//     }
	//   },
	//   {
	//     params: {
	//       name: '1-8'
	//     }
	//   }
	// ]
	return fileNames.map((fileName) => {
		return {
			params: {
				name: fileName.replace(/\.json$/, ""),
			},
		};
	});
}

export async function getStageData(name) {
	const fullPath = path.join(stagesDirectory, `${name}.json`);
	const fileContents = fs.readFileSync(fullPath);

	const stageJson = JSON.parse(fileContents);
	console.log("stageJson",stageJson);

	// Combine the data with the id and contentHtml
	return {
		name,
		stageJson
	};
}
