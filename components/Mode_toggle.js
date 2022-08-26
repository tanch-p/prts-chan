export default function ModeToggle({ hardMode, setHardMode, langPack }) {

	return (
		<div className="grid grid-cols-2 font-bold text-lg text-gray-700 mt-8 mb-3 select-none">
			<div
				className={`flex justify-center items-center py-3 bg-[#dea41b] hover:cursor-pointer ${
					!hardMode ? "text-gray-900" : "opacity-30"
				}`}
				onClick={() => setHardMode(false)}
			>
				<p>{langPack.normal_mode}</p>
			</div>
			<div
				className={`flex justify-center items-center bg-[#cb710c]  hover:cursor-pointer ${
					hardMode ? "text-black" : "opacity-30"
				}`}
				onClick={() => setHardMode(true)}
			>
				<p>{langPack.hard_mode}</p>
			</div>
		</div>
	);
}
