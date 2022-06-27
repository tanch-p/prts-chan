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
	const [hover, setHover] = useState(false);

	return (
		<>
			<div className="mt-2  text-xl max-w-5xl">
				<div className={` font-semibold ${fontThemes[language]}`}>
					{mapConfig.name[language]}
				</div>
				<div className="">
					<div
						className="md:h-[360px] relative select-none z-0"
						onMouseEnter={() => setHover(true)}
						onMouseLeave={() => setHover(false)}
					>
						<div
							className={`absolute flex flex-col items-center justify-center bg-neutral-800 transition-opacity ${
								hover ? "opacity-[.85]" : "opacity-0"
							}  h-full w-full z-10`}
						>
							{mapConfig.hasOwnProperty("sp_count") && (
								<div className="flex items-center relative h-[75px] bg-neutral-900 bg-opacity-80 pr-4">
									<Image
										src={DLDGPN}
										height="75px"
										width="75px"
										layout="intrinsic"
										alt="sp enemy"
										className="bg-[#0a0a0a]"
									/>

									<p className=" flex items-center text-3xl h-full pl-3">
										<span className="">-</span>{" "}
										<Image
											src={enemy_count}
											layout="intrinsic"
											alt="map enemy count"
											className=""
										/>
										{mapConfig.sp_count}
									</p>
								</div>
							)}
						</div>
						<div className="absolute flex items-center bg-neutral-900 bg-opacity-80 hover:opacity-10 p-2 right-0 bottom-[20%]  z-[5]">
							<Image
								src={cost_icon}
								height="30px"
								width="30px"
								layout="intrinsic"
								alt="cost icon"
								className=""
							/>
							<p className="pl-2 font-medium">{langPack.initial_cost} - 10</p>
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
				<div className="w-[100vw] md:w-full">{/* <h2>Map stats</h2> */}</div>
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
