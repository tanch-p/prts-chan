import DLD from "@/public/enemy_icons/DLD.png";
import GPN from "@/public/enemy_icons/GPN.png";
import THF from "@/public/enemy_icons/THF.png";
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
									className={`w-full cursor-pointer`}
									key={title}
									onClick={() => setCurrent(index)}
								>
									{icon ? (
										<Image
											src={icon.img}
											height="50px"
											width="50px"
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
