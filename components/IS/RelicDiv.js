import Image from "next/image";

export default function RelicDiv({ label, data, type, state, setState }) {
	return (
		<div className="place-self-center">
			<p className="text-center md:text-left mb-2 text-xl font-medium">
				{label}
			</p>
			<div
				className={`flex flex-wrap justify-center gap-y-1 md:grid grid-cols-[repeat(6,140px)] gap-x-1 md:gap-x-[1px]`}
			>
				{data.map((relic) => {
					const selected = state.find((ele) => ele.img === relic.img);
					const someSelected = state.length > 0;
					return (
						<div
							id={`relic-${relic.img}`}
							key={relic.img}
							className={`group hover:cursor-pointer w-[140px] shadow-[0_0px_0_2px_#131313]
						${!selected ? "bg-[#303030] bg-opacity-80" : "bg-[#414141] bg-opacity-30"}
						${
							type === "hard"
								? !someSelected && !selected
									? "hover:bg-[#414141] hover:bg-opacity-90 "
									: ""
								: !selected && "hover:bg-[#414141] hover:bg-opacity-90"
						}`}
							onClick={() => {
								if (type === "hard") {
									if (selected) setState([]);
									else setState([relic]);
								} else {
									if (selected)
										setState(state.filter((ele) => ele.img !== relic.img));
									else setState([...state, relic]);
								}
							}}
						>
							<Image
								src={`/images/phcs/${relic.img}.png`}
								alt={relic.name["cn"]}
								width={140}
								height={140}
								layout="intrinsic"
								className={`translate-y-1 ${
									!selected && "grayscale brightness-[.05]"
								} ${
									type === "hard"
										? !someSelected && !selected
											? "md:group-hover:grayscale-0 md:group-hover:brightness-100"
											: ""
										: !selected &&
										  "md:group-hover:grayscale-0 md:group-hover:brightness-100"
								}`}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
}
