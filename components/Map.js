import Image from "next/image";
import DLDGPN from "@/public/images/phcs/DLDGPN.png";
import cost_icon from "@/public/images/misc/cost.png";
import enemy_count from "@/public/images/misc/enemy_count.png";
import { useState } from "react";

export default function Map({ mapConfig, language, device, fontThemes }) {
	const langPack = require(`/lang/${language}.json`);
	//base 1062 x 600
	const width =
		device === "mobile" ? (1062 * 2) / 5 : Math.floor((1062 * 3) / 5);
	const height =
		device === "mobile" ? (600 * 2) / 5 : Math.floor((600 * 3) / 5);

	return (
		<>
			<div className="mt-2 text-xl w-max mx-auto">
				<div className={` font-semibold ${fontThemes[language]}`}>
					{mapConfig.name[language]}
				</div>
				<div className="">
					<div className="md:h-[360px] relative select-none z-0 flex justify-center">
						<div className="absolute left-[50%] -translate-x-[50%] z-[5] bg-neutral-900 bg-opacity-80 pl-2 pr-4 py-2 flex items-center">
							<Image
								src={enemy_count}
								layout="intrinsic"
								alt="map enemy count"
								className=""
								unoptimized
							/>
							<p>{mapConfig.count}</p>
						</div>
						<div className="absolute flex items-center bg-neutral-900 bg-opacity-80 p-2 right-0 bottom-[20%] z-[5]">
							<Image
								src={cost_icon}
								height="30px"
								width="30px"
								layout="intrinsic"
								alt="cost icon"
								className=""
							/>
							<p className="pl-2 font-medium">
								{langPack.initial_cost} - {mapConfig.initial_cost}
							</p>
						</div>
						<Image
							priority
							src={`/images/maps/${mapConfig.img}.webp`}
							alt={mapConfig.name[language]}
							width={width}
							height={height}
							className=""
						/>
					</div>
					<div></div>
				</div>
				<div className="w-[100vw] md:w-full">
					<div className="flex justify-center items-center gap-x-5">
						<Image
							src={DLDGPN}
							height="75px"
							width="75px"
							layout="fixed"
							alt="sp enemy"
							className="bg-[#0a0a0a]"
						/>
						{mapConfig.sp_count}
					</div>
				</div>
			</div>
		</>
	);
}

{
	/* <div className="absolute left-[50%] -translate-x-[50%] flex items-center">
<Image src={enemy_count} layout="intrinsic" className="" />{" "}
59
</div> */
}
