import Image from "next/image";
import { useAppContext } from "context/AppContext";
import hallucinationsList from "@/data/phcs/hallucinations.json";
import { useState } from "react";
import hallu_banner from "@/public/images/phcs/hallu-banner.png";

const FLOOR_ROMAN_NUMERALS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

const HallucationDiv = ({ text, selected, size }) => {
	const selectedStyles = "bg-hallu-red";
	const unselectedStyles = "bg-neutral-800 text-neutral-500";
	// console.log(text, selected);
	return (
		<div
			className={`${selected ? selectedStyles : unselectedStyles} ${
				size === "small" ? "h-[28px] w-[74px]" : "h-[34px] w-[104px]"
			} relative`}
		>
			<div className="text-center flex items-center justify-center h-full">
				{text}的
			</div>
			<div
				className={`absolute ${
					selected ? selectedStyles : unselectedStyles
				} rounded-full h-[18px] w-[20px] top-[50%] -translate-y-[50%] -translate-x-[40%]`}
			></div>
			<div
				className={`absolute ${
					selected ? selectedStyles : unselectedStyles
				} rounded-full h-[18px] w-[20px] top-[50%] -translate-y-[50%] right-0 translate-x-[40%]`}
			></div>
		</div>
	);
};

const Dropdown = ({ open, setOpen, state, setState }) => {
	return (
		<>
			<div
				className={`absolute left-[50%] -translate-x-[50%] mt-2 w-[700px] pb-8 rounded-md shadow-lg select-none bg-[#1b1b1b] transition-[opacity_transform] ease-in duration-200 ${
					open
						? "opacity-100 z-20 translate-y-0"
						: "invisible opacity-0 -translate-y-10"
				}`}
			>
				<div className="mx-auto flex justify-center">
					<Image
						src={hallu_banner}
						alt="hallucinations"
						layout="fixed"
						unoptimized
					/>
				</div>
				<div className="w-[70%] mx-auto mt-3">
					<div className="grid grid-cols-3 gap-y-4 place-items-center">
						{hallucinationsList.map((hallu) => {
							const selected = state.find((ele) => ele.key === hallu.key);
							return (
								<div
									key={hallu.key}
									className="cursor-pointer"
									onClick={() => {
										if (selected)
											setState(state.filter((ele) => ele.key !== hallu.key));
										else {
											if (state.length < 2) {
												setState([...state, hallu]);
											} else {
												const stateHolder = [...state];
												stateHolder.shift();
												stateHolder.push(hallu);
												setState(stateHolder);
											}
										}
									}}
								>
									<HallucationDiv
										text={hallu.name}
										selected={selected}
										size="normal"
									/>
								</div>
							);
						})}
					</div>
				</div>
			</div>
			{open && (
				<div
					className="fixed inset-0 z-[1]"
					onClick={() => setOpen(!open)}
				></div>
			)}
		</>
	);
};

export default function FloorTitle({ theme }) {
	const { hallucinations, setHallucinations, floor, language } =
		useAppContext();
	const langPack = require("../../lang/" + language + ".json");
	const [open, setOpen] = useState(false);

	return (
		<>
			<div className="relative text-xl select-none self-center place-self-center">
				<div
					className="flex flex-col hover:cursor-pointer"
					onClick={() => {
						setOpen(!open);
					}}
				>
					<div className="flex place-items-center gap-x-8">
						<div className="border-y border-neutral-600 w-[104px]"></div>
						<p className=" text-neutral-300">
							{FLOOR_ROMAN_NUMERALS[floor - 1]}
						</p>
						<div className="border-y border-neutral-600 w-[104px]"></div>
					</div>
					<div className="flex items-center justify-center gap-x-[18px] text-base">
						{hallucinations.map((hallu) => {
							return (
								<HallucationDiv
									key={hallu.name}
									text={hallu.name}
									selected={true}
									size="small"
								/>
							);
						})}
					</div>
					<p className="text-center">{langPack.phcs_levels[floor - 1]}</p>
				</div>
				<Dropdown
					open={open}
					setOpen={setOpen}
					state={hallucinations}
					setState={setHallucinations}
				/>
			</div>
		</>
	);
}
