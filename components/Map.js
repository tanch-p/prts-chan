import Image from "next/image";
import DLDGPN from "@/public/images/phcs/DLDGPN.png";
import cost_icon from "@/public/images/misc/cost.png";
import enemy_count from "@/public/images/misc/enemy_count.png";
import VideoTab from "./Video_tab";

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
						<VideoTab
							mapConfig={mapConfig}
							routes={routes}
							langPack={langPack}
							language={language}
							width={width}
							height={height}
						/>
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
