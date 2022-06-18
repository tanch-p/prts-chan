import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const TabComponent = ({ tabArr }) => {
	const [current, setCurrent] = useState(0);
	return (
		<div>
			<ul className="hidden font-semibold text-sm text-center text-gray-500  divide-x divide-gray-200 shadow sm:flex dark:divide-gray-700 dark:text-gray-400 ">
				{tabArr.map((tab, index) => (
					<li
						className={`w-full cursor-pointer `}
						key={tab.key}
						onClick={() => setCurrent(index)}
					>
						<span
							className={`inline-block p-4 w-full  active focus:outline-none  dark:text-white ${
								tab.key === "hard"
									? "bg-orange-500 text-white"
									: "text-gray-900 bg-gray-100 dark:bg-gray-700"
							} ${current !== index ? "opacity-40" : ""}`}
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
