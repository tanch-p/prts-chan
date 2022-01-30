import fs from "fs";
import path from "path";

const stagesDirectory = path.join(process.cwd(), "stages");

export function getStageData() {
    console.log("running");
	// Get file names under /posts
	const fileNames = fs.readdirSync(stagesDirectory);

	// let rawdata = fs.readFileSync("../stages/1-7.json");
	// let student = JSON.parse(rawdata);
	// console.log(student);

	const allStageData = fileNames.map((fileName) => {
		// Remove ".md" from file name to get id
		const name = fileName.replace(/\.json$/, "");
        console.log ("name",name);
		// Read markdown file as string 
		const fullPath = path.join(stagesDirectory, fileName);
		const fileContents = fs.readFileSync(fullPath);

		// Use gray-matter to parse the post metadata section
		const matterResult = JSON.parse(fileContents);

		// Combine the data with the id
		return {
			name,
			matterResult,
		};
	});
    return allStageData
}

export function getAllStageIds() {
	const fileNames = fs.readdirSync(stagesDirectory);

	// Returns an array that looks like this:
	// [
	//   {
	//     params: {
	//       id: 'ssg-ssr'
	//     }
	//   },
	//   {
	//     params: {
	//       id: 'pre-rendering'
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