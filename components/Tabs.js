import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export const TabComponent = ({ tabArr }) => {
	const [current, setCurrent] = useState(0);

	return (
		<div>
			<ul className="flex mb-3 mt-5 font-bold text-lg text-gray-700 text-center select-none">
				{tabArr.map((tab, index) => (
					<li
						className={`w-full cursor-pointer `}
						key={tab.key}
						onClick={() => setCurrent(index)}
					>
						<span
							className={`inline-block p-3 w-full  active focus:outline-none ${
								tab.key === "hard"
									? "bg-[#cb710c] text-black"
									: "text-gray-900 bg-[#dea41b]"
							} ${current !== index ? "opacity-30" : ""}`}
						>
							{tab.title}
						</span>
					</li>
				))}
			</ul>
			{tabArr.map((tab, index) => (
				<div hidden={index !== current} key={uuidv4()}>
					{tab.children}
				</div>
			))}
		</div>
	);
};
