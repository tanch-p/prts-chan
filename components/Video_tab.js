import DLD from "@/public/enemy_icons/DLD.png";
import GPN from "@/public/enemy_icons/GPN.png";
import THF from "@/public/enemy_icons/THF.png";
import phcs_combat_ops_icon from "@/public/images/phcs/phcs_combat_ops_icon.png";
import phcs_encounter from "@/public/images/phcs/phcs_encounter.png";
import phcs_emergency_ops_icon from "@/public/images/phcs/phcs_emergency_ops_icon.png";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function VideoTab({
	mapConfig,
	routes,
	langPack,
	language,
	width,
	height,
}) {
	const [current, setCurrent] = useState(0);

	const icons = [
		{ title: "duck", img: DLD },
		{ title: "gpn", img: GPN },
		{ title: "thf", img: THF },
		{ title: "combat_ops", img: phcs_combat_ops_icon, width: 49, height: 45 },
		{
			title: "emergency_ops",
			img: phcs_emergency_ops_icon,
			width: 49,
			height: 45,
		},
	];
	useEffect(() => {
		setCurrent(0);
	}, [mapConfig]);
	return (
		<>
			{routes.length > 1 && (
				<div>
					<ul className="flex font-bold text-lg text-white text-center select-none divide-x divide-gray-500">
						{routes.map(({ title }, index) => {
							const icon = icons.find((ele) => ele.title === title);
							return (
								<li
									className={`w-full cursor-pointer flex items-center justify-center py-1.5`}
									key={title}
									onClick={() => setCurrent(index)}
								>
									{icon ? (
										<Image
											src={icon.img}
											height={icon.height ?? 50}
											width={icon.width ?? 50}
											layout="fixed"
											alt={title}
											className={`${current !== index ? "opacity-30" : ""}`}
										/>
									) : (
										<span
											className={`inline-block p-3 w-full  active focus:outline-none ${
												current !== index ? "opacity-30" : ""
											}`}
										>
											{langPack[title]}
										</span>
									)}
								</li>
							);
						})}
					</ul>
				</div>
			)}
			{routes.map(({ id }, index) => (
				<div hidden={index !== current} key={id}>
					<RouteiframeComponent id={id} width={width} height={height} />
				</div>
			))}
		</>
	);
}

const RouteiframeComponent = ({ id, width, height }) => {
	return (
		<div key={id} className="flex justify-center">
			<iframe
				width={width}
				height={height}
				src={`https://www.youtube-nocookie.com/embed/${id}?rel=0`}
				frameBorder="0"
				allowFullScreen
			></iframe>
		</div>
	);
};

const getImageToUse = (title, mapConfig) => {
	switch (mapConfig.theme) {
		case "phcs":
			switch (title) {
				case "combat_ops":
					return phcs_combat_ops_icon;
				case "emergency_ops":
					return phcs_emergency_ops_icon;
			}
			break;
		case "mizuki":
			break;
	}
};
