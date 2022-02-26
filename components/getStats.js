const parseHighlight = (text, enemy) => {
	const regexp = /\$/g;
	const array = [...text.matchAll(regexp)];
	// console.log(array);
	const returnArr = [];
	let lastSliceIndex = 0;
	for (let i = 0; i < array.length; i += 2) {
		returnArr.push(<span>{text.slice(lastSliceIndex, array[i].index)}</span>);
		returnArr.push(
			<span className="text-rose-600 font-semibold">
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
	console.log(originalMultiplier);
	return tooltip.replace(
		"#mult",
		`${Math.round((originalMultiplier + specialMultiplier) * 100) / 100}`
	);
};

export const getRemarks = (
	enemy,
	specialMods,
	stats,
	language = "jp",
	type = "simple",
	format,
	row
) => {
	let remarksArr = [];
	if (specialMods.hasOwnProperty(enemy.id)) {
		if (specialMods[enemy.id].hasOwnProperty("extra")) {
			remarksArr = remarksArr.concat(
				specialMods[enemy.id].extra.tooltip[language]
			);
		}
		if (format === "prisoner") {
			if (row === 0) {
			} else {
			}
		} else {
			enemy["stats"][stats].special.forEach((skill) => {
				if (specialMods[enemy.id].hasOwnProperty(skill.name)) {
					specialMods[enemy.id][skill.name].tooltip[language].forEach((ele) => {
						if (ele.includes("#mult")) {
							remarksArr.push(
								getTooltipMultiplier(
									ele,
									skill.multiplier,
									specialMods[enemy.id][skill.name].multiplier
								)
							);
						} else {
							remarksArr.push(ele);
						}
					});
				} else {
					remarksArr = remarksArr.concat(
						enemy["stats"][stats][skill.name] !== undefined
							? enemy["stats"][stats][skill.name].tooltip[type][language]
							: skill.tooltip[type][language]
					);
				}
			});
		}
		// console.log(remarksArr);
		return remarksArr.map((line) => {
			return line.includes("$") ? parseHighlight(line, enemy) : <p>{line}</p>;
		});
	}
	if (format === "prisoner") {
		if (row === 0) {
			return enemy.imprisoned.special.map((skill) => {
				return skill.tooltip[type][language].map((line) => <p>{line}</p>);
			});
		} else {
			return enemy.release.special.map((skill) => {
				return skill.tooltip[type][language].map((line) => <p>{line}</p>);
			});
		}
	} else {
		return enemy["stats"][stats].special.map((skill) => {
			return skill.tooltip[type][language].map((line) => <p>{line}</p>);
		});
	}
};
