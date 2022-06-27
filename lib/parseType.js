import TooltipComponent from "../components/Tooltip";
import { v4 as uuidv4 } from "uuid";

export const parseType = (typeArr, language) => {
	const langpack = require(`../lang/${language}.json`);
	return typeArr.map((type) => {
		if (langpack.type[type].hasOwnProperty("text")) {
			return (
				<TooltipComponent
					key={uuidv4()}
					title={langpack.type[type].name}
					langpack={langpack}
					language={language}
					type={type}
					tooltipType="type"
					theme="light"
				/>
			);
		}
		return (
			<p key={uuidv4()} className="whitespace-nowrap">
				{langpack.type[type].name}
			</p>
		);
	});
};
