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

	const routes = mapConfig.routes;
	return (
		<>
			<div className="mt-2 text-xl w-[100vw] md:w-max mx-auto ">
				<div className={`pl-4 md:pl-0 font-semibold ${fontThemes[language]}`}>
					{mapConfig.name[language]}
				</div>
				<div className="">
					{routes ? (
						routes.map(({ title, category, id }) => (
							<div key={id} className="flex justify-center">
								<iframe
									width={width}
									height={height}
									src={`https://www.youtube-nocookie.com/embed/${id}?rel=0`}
									title={mapConfig.name[language]}
									frameBorder="0"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
									allowFullScreen
								></iframe>
							</div>
						))
					) : (
						<div className="md:h-[360px] relative select-none z-0 flex justify-center">
							<Image
								priority
								src={`/images/maps/${mapConfig.img}.webp`}
								alt={mapConfig.name[language]}
								width={width}
								height={height}
								className=""
							/>
						</div>
					)}
				</div>
				<div className="w-[100vw] md:w-full">
					{mapConfig.hasOwnProperty("sp_count") ? (
						<div className="flex justify-center items-center gap-x-1 my-4">
							<Image
								src={DLDGPN}
								height="75px"
								width="75px"
								layout="fixed"
								alt="sp enemy"
								className="bg-[#0a0a0a]"
							/>
							<Image
								src={enemy_count}
								layout="intrinsic"
								alt="map enemy count"
								className=""
								unoptimized
							/>
							<span className="font-medium text-2xl">{mapConfig.sp_count}</span>
						</div>
					) : null}
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

{
	/* <div className="">
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
</div> */
}

{
	/* <div className="absolute left-[50%] -translate-x-[50%] z-[5] bg-neutral-900 bg-opacity-80 pl-2 pr-4 py-2 flex items-center">
<Image
	src={enemy_count}
	layout="intrinsic"
	alt="map enemy count"
	className=""
	unoptimized
/>
<p>{mapConfig.count}</p>
</div> */
}
