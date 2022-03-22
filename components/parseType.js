import TooltipComponent from "./Tooltip";

export const parseType = (typeArr, language) => {
	return typeArr.map((type) => {
		let text = "";
		switch (type) {
			case "Ranged":
				text = ["Ops with effective talents/skills:","Firewatch: Talent"];
		}
		if (text !== "") {
			return <TooltipComponent title={type} text={text} theme="light" />;
		}
		return <p>{type}</p>;
	});
};
