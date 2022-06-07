import TooltipComponent from "./Tooltip";

export const parseType = (typeArr, language) => {
	const langpack = require(`../lang/${language}.json`);
	return typeArr.map((type) => {
		if (langpack.type[type].hasOwnProperty("text")) {
			return (
				<TooltipComponent
					title={langpack.type[type].name}
					langpack={langpack}
					language={language}
					type={type}
					tooltipType="type"
					theme="light"
				/>
			);
		}
		return <p className="whitespace-nowrap">{langpack.type[type].name}</p>;
	});
};
