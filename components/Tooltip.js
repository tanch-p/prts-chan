export default function TooltipComponent({
	title,
	type,
	langpack,
	theme,
	tooltipType,
}) {
	const position = {
		top: "bottom-full",
		bottom: "top-full",
	};
	console.log("type", type);
	if (tooltipType === "type") {
		return (
			<>
				<div className="group cursor-pointer relative">
					<div
						className={`${position.top}
								${theme === "light" ? "bg-gray-200 text-black" : "bg-gray-700 text-white"}
								absolute left-[50%] -translate-x-[50%] w-[200px] max-w-[200px]  text-left text-xs rounded-lg py-2 px-3 z-[300] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity`}
					>
						<p className="font-semibold">Effective Ops:</p>
						{langpack.type[type].ops.map((categoryObj) => {
							return Object.keys(categoryObj).map((key) => {
								return (
									<>
										<p>{key}</p>
										{categoryObj[key].map((op) => (
											<p>{op}</p>
										))}
									</>
								);
							});
						})}
						<svg
							className={`${
								theme === "light" ? "text-gray-200" : "text-gray-700"
							} absolute h-2 w-full left-0 top-full`}
							x="0px"
							y="0px"
							viewBox="0 0 255 255"
							xmlSpace="preserve"
						>
							<polygon
								className="fill-current"
								points="0,0 127.5,127.5 255,0"
							/>
						</svg>
					</div>
					<p className="underline underline-offset-1">{title}</p>
				</div>
			</>
		);
	}
	return <></>;
}
