import Image from "next/image";
import relicIcon from "../../public/images/phcs/relic.png";
import combat from "../../public/images/phcs/combat.png";
import Overlay from "./Overlay";
import useToggle from "../../hooks/useToggle";
import { useState } from "react";

export default function FooterBar() {
	const [relicOpen, setRelicOpen] = useToggle(false);
	const [relicsArr, setRelicsArr] = useState([]);
	return (
		<div className="fixed bottom-0 left-0 select-none">
			<Overlay
				open={relicOpen}
				setOpen={setRelicOpen}
				relicsArr={relicsArr}
				setRelicsArr={setRelicsArr}
			/>
			<div
				as="nav"
				className="border-t-2 border-gray-600 bg-neutral-900 w-full mt-4 fixed bottom-0 py-2 z-[30]"
				onClick={() => {
					if (relicOpen) setRelicOpen(!relicOpen);
				}}
			>
				<>
					<div className="max-w-7xl mx-auto px-2 md:px-4">
						<div className="relative flex items-center justify-between h-16">
							<div className=" flex items-center py-[2px] bg-gradient-to-r from-neutral-600 via-neutral-900 to-neutral-900 relative">
								<div className="flex items-center px-[6px] py-1 relative">

									<Image
										src={relicIcon}
										layout="intrinsic"
										className="hover:cursor-pointer "
										unoptimized
										onClick={() => {
											setRelicOpen(!relicOpen);
										}}
									/>
								</div>
								<div className="bg-neutral-900 w-[280px] overflow-hidden h-14 gap-x-2 pl-1">
									<div className="flex gap-x-2 items-center">
										{relicsArr.map((img, index) =>
											index < 5 ? (
												<div
													className="relative flex items-center"
													key={`small-${img}`}
												>
													<div className="absolute rounded-full border-[3px] border-neutral-600  border-opacity-80 left-[50%] w-[44px] h-[44px] -translate-x-[50%]"></div>
													<div className="flex items-center text-center">
														<Image
															src={`/images/phcs/${img}.png`}
															width="54px"
															height="54px"
															layout="fixed"
															alt="relic"
														/>
													</div>
												</div>
											) : null
										)}
									</div>
								</div>
							</div>
							<div className="">
								<Image src={combat} layout="intrinsic" />
							</div>
						</div>
					</div>
				</>
			</div>
		</div>
	);
}
