import Image from "next/image";

export default function RelicDiv({ label, data, type, state, setState }) {
	return (
		<div className="place-self-center">
			<p>{label}</p>
			<div className={`grid grid-cols-[repeat(6,140px)] gap-x-[1px]`}>
				{data.map((relic) => {
					const selected = state.find((ele) => ele.key === relic.img);
					const someSelected = state.length > 0;
					return (
						<div
							key={relic.img}
							className={`group hover:cursor-pointer w-[140px] shadow-[0_0px_0_2px_#131313]
						${!selected ? "bg-[#303030] bg-opacity-80" : "bg-[#414141] bg-opacity-90"}
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
									else setState([{ key: relic.img, effects: relic.effects }]);
								} else {
									if (selected)
										setState(state.filter((ele) => ele.key !== relic.img));
									else
										setState([
											...state,
											{ key: relic.img, effects: relic.effects },
										]);
								}
							}}
						>
							<Image
								src={`/images/phcs/${relic.img}.png`}
								alt={relic.name["cn"]}
								width={140}
								height={140}
								layout="fixed"
								className={`translate-y-1 ${
									!selected && "grayscale brightness-[.05]"
								} ${
									type === "hard"
										? !someSelected && !selected
											? "group-hover:grayscale-0 group-hover:brightness-100"
											: ""
										: !selected &&
										  "group-hover:grayscale-0 group-hover:brightness-100"
								}`}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
}
