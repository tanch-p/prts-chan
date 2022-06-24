import RelicDiv from "./RelicDiv";
import relics from "@/data/phcs/relics.json";
import { useAppContext } from "context/AppContext";
import { useState, useEffect } from "react";

export default function Overlay({ open, setOpen, relicsArr, setRelicsArr }) {
	const {
		language,
		selectedHardRelic,
		setSelectedHardRelic,
		selectedNormalRelic,
		setSelectedNormalRelic,
	} = useAppContext();

	useEffect(() => {
		const element = document.getElementById("relic-container");
		element.scrollTo(0, element.scrollHeight);
	}, []);

	useEffect(() => {
		setRelicsArr([
			...selectedHardRelic.map((relic) => relic.img),
			...selectedNormalRelic.map((relic) => relic.img),
		]);
	}, [selectedHardRelic, selectedNormalRelic]);

	return (
		<div
			className={`relative transition-opacity duration-[50ms] ease-in-out select-none ${
				open ? "opacity-100" : "opacity-0 invisible"
			}`}
			role="dialog"
		>
			<div
				id="relic-container"
				className="fixed inset-0 bg-ph-bg bg-opacity-90 overflow-y-scroll"
				onClick={(e) => {
					if (
						e.target.localName !== "img" &&
						e.target.localName !== "span" &&
						!e.target.id.includes("relic") &&
						!e.target.id.includes("reset")
					) {
						setOpen(false);
					}
				}}
			>
				<div className="max-w-7xl mx-auto py-36 ">
					<div className="flex flex-col-reverse gap-y-12 w-full my-auto">
						<div
							id="reset"
							className="place-self-center rounded-xl bg-neutral-700 px-16 py-2 hover:cursor-pointer hover:bg-neutral-600"
							onClick={() => {
								setSelectedHardRelic([]);
								setSelectedNormalRelic([]);
							}}
						>
							Reset
						</div>
						<RelicDiv
							label="Hard Relics"
							data={relics.hard}
							type="hard"
							state={selectedHardRelic}
							setState={setSelectedHardRelic}
						/>
						<RelicDiv
							label="-ATK"
							data={relics.atk}
							type="normal"
							state={selectedNormalRelic}
							setState={setSelectedNormalRelic}
						/>
						<RelicDiv
							label="-DEF"
							data={relics.def}
							type="normal"
							state={selectedNormalRelic}
							setState={setSelectedNormalRelic}
						/>
						<RelicDiv
							label="-HP"
							data={relics.hp}
							type="normal"
							state={selectedNormalRelic}
							setState={setSelectedNormalRelic}
						/>
						<RelicDiv
							label="Others"
							data={relics.others}
							type="normal"
							state={selectedNormalRelic}
							setState={setSelectedNormalRelic}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
