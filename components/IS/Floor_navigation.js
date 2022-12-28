import Image from "next/image";
import phcs_combat_ops from "@/public/images/phcs/phcs_combat_ops.png";
import phcs_boss from "@/public/images/misc/boss.png";
import phcs_encounter from "@/public/images/phcs/phcs_encounter.png";
import phcs_emergency_ops from "@/public/images/phcs/phcs_emergency_ops.png";
import Link from "next/link";
import { FLOOR_ROMAN_NUMERALS } from "./Floor_title";
import { useState, useEffect } from "react";
import { LeftArrowSVG } from "../svg";

export const normalOps = (
	<Image
		src={phcs_combat_ops}
		width={"100px"}
		height={"42px"}
		alt="combat"
		layout="fixed"
	/>
);
const emergencyOps = (
	<Image
		src={phcs_emergency_ops}
		width={"100px"}
		height={"42px"}
		alt="emergency operation"
		layout="fixed"
	/>
);
export const bossStage = (
	<Image src={phcs_boss} width={"100px"} height={"42px"} alt="boss" layout="fixed" />
);
export const encountStage = (
	<Image
		src={phcs_encounter}
		width={"100px"}
		height={"42px"}
		alt="encount"
		layout="fixed"
	/>
);

export default function FloorNavigation({ stagesList, floor, language }) {
	const FLOORS = [1, 2, 3, 4, 5, 6];
	const [selectedFloor, setSelectedFloor] = useState(floor);

	const stages = stagesList.map(({ params }) => {
		const { name } = params;
		const stage = require(`../../stages/is/${name}.json`);
		return {
			fileName: name,
			floors: stage.floor_nav,
			title: stage.name[language],
		};
	});
	const allEncounterStages = stages.filter(({ fileName }) =>
		fileName.includes("ISW-SP")
	);
	const allDuckStages = stages.filter(({ fileName }) =>
		fileName.includes("ISW-DU")
	);
	const allBossStages = stages.filter(({ fileName }) =>
		fileName.includes("ISW-DF")
	);
	const allNormalStages = stages.filter(({ fileName }) =>
		fileName.includes("ISW-NO")
	);

	const IndivFloorNavigation = ({ floor, selectedFloor }) => {
		const floorNormalStages = getStageLink(allNormalStages, floor, language);
		const floorEncounterStages = getStageLink(
			allEncounterStages,
			floor,
			language
		);

		const floorBossStages = getStageLink(allBossStages, floor, language);
		const floorDuckStages = getStageLink(allDuckStages, floor, language);

		const emergencyStages = getStageLink(allNormalStages, 1, language);
		return (
			<div
				className={`grid auto-rows-auto ${
					selectedFloor === floor ? "" : "hidden"
				}`}
			>
				<div
					className={`flex flex-col md:grid items-center shadow-lg ${
						language === "jp"
							? "md:grid-cols-[100px_560px]"
							: "md:grid-cols-[100px_480px]"
					}`}
				>
					<div className="md:h-[68px] pt-2 md:pt-0 flex items-center">
						{normalOps}
					</div>
					<div className="flex flex-wrap md:flex-wrap-reverse justify-center items-center mb-1">
						{floorNormalStages}
					</div>
				</div>
				{floor === 2 ? (
					<div
						className={`flex flex-col md:grid items-center shadow-lg ${
							language === "jp"
								? "md:grid-cols-[100px_560px]"
								: "md:grid-cols-[100px_480px]"
						}`}
					>
						<div className="md:h-[68px] pt-2 md:pt-0 flex items-center">
							{emergencyOps}
						</div>
						<div className="flex flex-wrap md:flex-wrap-reverse justify-center items-center mb-1">
							{emergencyStages}
						</div>
					</div>
				) : (
					""
				)}
				{(floorDuckStages.length > 0 || floorEncounterStages.length > 0) && (
					<div
						className={`flex flex-col md:grid items-center shadow-lg ${
							language === "jp"
								? "md:grid-cols-[100px_560px]"
								: "md:grid-cols-[100px_480px]"
						}`}
					>
						<div className="md:h-[68px] pt-4 md:pt-0 flex items-center">
							{encountStage}
						</div>
						<div className="flex flex-wrap  items-center justify-center mb-1">
							{floorDuckStages}
							{floorEncounterStages}
						</div>
					</div>
				)}
				{floorBossStages.length > 0 && (
					<div
						className={`flex flex-col md:grid items-center shadow-lg ${
							language === "jp"
								? "md:grid-cols-[100px_560px]"
								: "md:grid-cols-[100px_480px]"
						}`}
					>
						<div className="md:h-[68px] pt-4 md:pt-0 flex items-center">
							{bossStage}
						</div>
						<div className="flex flex-wrap md:flex-nowrap  items-center justify-center mb-1">
							{floorBossStages}
						</div>
					</div>
				)}
			</div>
		);
	};

	useEffect(() => {
		setSelectedFloor(floor);
	}, [floor]);

	return (
		<div className="grid grid-cols-[35px_auto_35px] items-center w-[100vw] md:w-max md:-translate-x-[55px] mt-16 mx-auto select-none shadow-lg ">
			<div></div>

			<div className="md:grid grid-cols-[100px_auto]">
				<div></div>
				<p className="text-center text-lg font-medium shadow-lg mb-1 ">
					{FLOOR_ROMAN_NUMERALS[selectedFloor - 1]}
				</p>
			</div>
			<div></div>
			<div
				className={`${
					selectedFloor > 1
						? "hover:cursor-pointer hover:bg-neutral-700"
						: "brightness-50"
				} w-[35px] h-full flex items-center justify-center shadow-lg`}
				onClick={() => {
					if (selectedFloor > 1) setSelectedFloor(selectedFloor - 1);
				}}
			>
				<LeftArrowSVG />
			</div>

			{FLOORS.map((floor) => {
				return (
					<IndivFloorNavigation
						key={"floor" + floor}
						selectedFloor={selectedFloor}
						floor={floor}
					/>
				);
			})}
			<div
				className={`${
					selectedFloor < 6
						? "hover:cursor-pointer hover:bg-neutral-700"
						: "brightness-50"
				} w-[35px] h-full flex items-center justify-center shadow-lg`}
				onClick={() => {
					if (selectedFloor < 6) setSelectedFloor(selectedFloor + 1);
				}}
			>
				<LeftArrowSVG className="h-6 w-6 rotate-180" />
			</div>
		</div>
	);
}

export const getStageLink = (stages, floor, language) => {
	return stages
		.filter(({ floors }) => floors.includes(floor))
		.map(({ title, fileName }) => (
			<Link href={fileName} key={fileName}>
				<div
					className={`hover:text-sky-400  md:h-full mx-2 my-3 md:my-1 text-center hover:cursor-pointer ${languageStyles[language]}`}
				>
					<span>{title}</span>
				</div>
			</Link>
		));
};

const languageStyles = {
	jp: "whitespace-nowrap py-2 w-[120px]",
	en: "text-sm w-[100px] py-1",
	cn: "text-base w-[100px]",
};
