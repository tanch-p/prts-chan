export default function TooltipComponent({
	title,
	type,
	langpack,
	language,
	theme,
	tooltipType,
}) {
	const position = {
		top: "bottom-full",
		bottom: "top-full",
	};
	if (tooltipType === "type") {
		return (
			<div className="group cursor-pointer relative w-min">
				<div className="overflow-hidden">
					<div
						className={`${position.top}
						${language === "jp" ? "text-sm w-[230px]" : "text-sm w-[160px]"}
								${
									theme === "light"
										? "bg-gray-300 border border-black text-black"
										: "bg-gray-700 text-white"
								}
								absolute left-[50%] -translate-x-[50%] text-left rounded-lg py-2 px-3 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity`}
					>
						{/* <p className="">Effective Operators</p> */}
						{langpack.type[type].ops.map((categoryObj) => {
							return Object.keys(categoryObj).map((key) => {
								return (
									<ul className="" key={key}>
										<span className="font-semibold">{key}</span>
										{categoryObj[key].map((op) => (
											<li className="" key={op}>
												- {op}
											</li>
										))}
									</ul>
								);
							});
						})}
						{langpack.type[type].text}
						<div
							className={`inner-triangle w-0 h-0 absolute top-full left-[50%] -translate-x-[50%] border-x-transparent border-x-[7px] border-t-[8px] z-10 ${
								theme === "light" ? "border-gray-300 " : "border-gray-700"
							}`}
						></div>
						<div className="outer-triangle w-0 h-0 absolute  top-full  left-[50%] -translate-x-[50%] border-x-transparent border-x-[8px] border-t-[9px] border-black"></div>
					</div>
				</div>
				<p className="underline underline-offset-1 whitespace-nowrap">
					{title}
				</p>
			</div>
		);
	}
	return <></>;
}
