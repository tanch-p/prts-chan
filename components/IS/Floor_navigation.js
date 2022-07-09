import Image from "next/image";
import normal_ops from "@/public/images/misc/normal_ops.png";
import boss from "@/public/images/misc/boss.png";
import encount from "@/public/images/misc/encount.png";
import emergency_ops from "@/public/images/misc/emergency_ops.png";

const normalOps = (
	<Image src={normal_ops} alt="combat" layout="fixed" unoptimized />
);
const emergencyOps = (
	<Image
		src={emergency_ops}
		alt="emergency operation"
		layout="fixed"
		unoptimized
	/>
);
const bossStage = <Image src={boss} alt="boss" layout="fixed" unoptimized />;
const encountStage = (
	<Image src={encount} alt="encount" layout="fixed" unoptimized />
);

export default function FloorNavigation({ stagesList, floor }) {
	const FLOORS = [1, 2, 3, 4, 5, 6];

	const stages = stagesList.map(({ params }) => {
		const { name } = params;
		const stage = require(`../../stages/is/${name}.json`);
		return { name, floors: stage.floors };
	});
	const allEncounterStages = stages.filter(({ name }) =>
		name.includes("ISW-SP")
	);
	const allDuckStages = stages.filter(({ name }) => name.includes("ISW-DU"));
	const allBossStages = stages.filter(({ name }) => name.includes("ISW-DF"));
	const allNormalStages = stages.filter(({ name }) => name.includes("ISW-NO"));

	const floorNormalStages = allNormalStages
		.filter(({ floors }) => floors.includes(floor))
		.map(({ name }) => <p key={name}>{name.slice(7)}</p>);
	const floorEncounterStages = allEncounterStages
		.filter(({ floors }) => floors.includes(floor))
		.map(({ name }) => <p key={name}>{name.slice(7)}</p>);
	const floorBossStages = allBossStages
		.filter(({ floors }) => floors.includes(floor))
		.map(({ name }) => <p key={name}>{name.slice(7)}</p>);
	const floorDuckStages = allDuckStages
		.filter(({ floors }) => floors.includes(floor))
		.map(({ name }) => <p key={name}>{name.slice(7)}</p>);

	console.log(floorBossStages);
	return (
		<div className="grid auto-rows-auto">
			<div className="grid grid-cols-2 items-center">
				<div className="">{normalOps}</div>
				<div className="flex">{floorNormalStages}</div>
			</div>
			<div className="grid grid-cols-2 items-center">
				<div className="">{encountStage}</div>
				<div className="grid grid-rows-2 justify-center">
					<div className="flex">{floorDuckStages}</div>
					<div className="flex">{floorEncounterStages}</div>
				</div>
			</div>
			<div className="grid grid-cols-2 items-center">
				<div className="">{bossStage}</div>
				<div className="flex">{floorBossStages}</div>
			</div>
		</div>
	);
}
