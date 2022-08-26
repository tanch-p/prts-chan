import Risk_triangle from "./Risk_triangle";
import useToggle from "hooks/useToggle";
import { v4 as uuidv4 } from "uuid";

export default function Selected_options({ selected, ccType }) {
	const [value, toggleValue] = useToggle(true);

	return (
		<>
			<div className="p-3 bg-black text-white" onClick={toggleValue}>
				<span className="">Selected_options</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-6 w-6 float-right"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					strokeWidth={2}
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d={value ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
					/>
				</svg>
			</div>
			{value ? (
				<div className="overflow-scroll md:overflow-hidden">
					<div className="flex flex-wrap flex-col border-b border-b-gray-400 w-[100vw] md:w-full md:h-[300px] md:max-w-[900px] text-[12px] lg:text-md bg-[#292929] text-gray-300">
						{selected.map((option) => (
							<div key={uuidv4()}>
								{/* {option.tooltip !== "" ? (
                <Risk_triangle risk={option.rank} />
              ) : null} */}
								<p
									className={`${
										ccType === "perma" ? "max-w-[400px]" : "max-w-[600px]"
									} mx-2`}
								>
									{option.tooltip}
								</p>
							</div>
						))}
					</div>
				</div>
			) : null}
		</>
	);
}
