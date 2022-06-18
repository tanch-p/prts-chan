import RelicDiv from "./RelicDiv";
import relics from "@/data/phcs/relics.json";
import { useAppContext } from "context/AppContext";
import { useState, useEffect } from "react";

export default function Overlay({ open }) {
	const {
		language,
		selectedHardRelic,
		setSelectedHardRelic,
		selectedNormalRelic,
		setSelectedNormalRelic,
	} = useAppContext();

	const [relicsArr, setRelicsArr] = useState([]);
	useEffect(() => {
        const element = document.getElementById("relic-container");
        element.scrollTo(0, element.scrollHeight)
    }, []);
	return (
		<div
			className={`relative transition-opacity duration-[50ms] ease-in-out select-none ${
				open ? "opacity-100" : "opacity-0 invisible"
			}`}
			role="dialog"
		>
			<div
				id="relic-container"
				className="fixed inset-0 bg-[#131313] bg-opacity-90 overflow-y-scroll"
			>
				<div className="max-w-7xl mx-auto pt-36 pb-48 ">
					<div className="flex flex-col-reverse gap-y-16 w-full my-auto">
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
