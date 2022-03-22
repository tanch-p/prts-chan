export default function TooltipComponent({ title, text, theme }) {
	const position = {
		top: "bottom-full",
		bottom: "top-full",
	};

	return (
		<>
			<div className="group cursor-pointer relative">
				<div
					className={`${position.top}
							${theme === 'light' ? "bg-gray-200 text-black" : "bg-gray-700 text-white"}
							absolute left-[50%] -translate-x-[50%]  text-left text-xs rounded-lg py-2 px-3 z-[300] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity`}
				>
					{text}
					<svg
						className={`${theme === 'light' ? "text-gray-200" : "text-gray-700"} absolute h-2 w-full left-0 top-full`}
						x="0px"
						y="0px"
						viewBox="0 0 255 255"
						xmlSpace="preserve"
					>
						<polygon className="fill-current" points="0,0 127.5,127.5 255,0" />
					</svg>
				</div>
				<p className="underline underline-offset-1">{title}</p>
			</div>
		</>
	);
}
