import Image from "next/image";
import Link from "next/link";
import CC9_banner from "@/public/images/banners/CC9_banner.webp";

export default function CCIndex({ language, langPack }) {
	const getTheme = () => {
		return language === "en" ? "text-xs" : "";
	};
	const dailyStages = [
		{ text: "尚蜀山道", link: "CC9_尚蜀山道_1" },
		{ text: "尚蜀山道", link: "CC9_尚蜀山道_1" },
		{ text: "遗弃地块", link: "CC9_遗弃地块_1" },
		{ text: "灰齐山麓", link: "CC9_灰齐山麓_1" },
		{ text: "沙海遗迹", link: "CC9_沙海遗迹_1" },
		{ text: "狂嚎沙原", link: "CC9_狂嚎沙原_1" },
		{ text: "炽热溶洞", link: "CC9_炽热溶洞_1" },
		{ text: "大骑士领酒吧街", link: "CC9_大骑士领酒吧街_1" },
		{ text: "灰齐山麓", link: "CC9_灰齐山麓_2" },
		{ text: "大骑士领酒吧街", link: "CC9_大骑士领酒吧街_2" },
		{ text: "沙海遗迹", link: "CC9_沙海遗迹_2" },
		{ text: "炽热溶洞", link: "CC9_炽热溶洞_2" },
		{ text: "狂嚎沙原", link: "CC9_狂嚎沙原_2" },
		{ text: "尚蜀山道", link: "CC9_尚蜀山道_2" },
	];

	const dailyCCArr = [];
	let day = 8;
	let month = 12;
	for (const [index, { text, link }] of dailyStages.entries()) {
		dailyCCArr.push(
			<div className="border-b border-gray-500 mt-1" key={index}>
				<div className="h-min w-full text-sm py-1">{`${month}/${
					day + index
				}`}</div>
				<Link href={`/stages/cc/${link}`}>
					<div
						className={`flex items-center justify-center ${
							language === "jp" ? "text-sm" : "text-xs"
						} hover:cursor-pointer hover:bg-gray-600 w-full min-h-[40px] text-indigo-300`}
					>
						<p className="py-2 px-2">{langPack[text]}</p>
					</div>
				</Link>
			</div>
		);
	}
	return (
		<div id="cc6" className="max-w-screen-sm md:max-w-3xl mb-24">
			<div className="relative shadow-2xl max-w-screen-sm md:max-w-3xl md:mt-8">
				<Image
					src={CC9_banner}
					layout="intrinsic"
					alt="CC8 Banner"
					className=""
				/>
			</div>
			<table className="border border-gray-500 border-collapse w-full text-center align-middle">
				<tbody>
					<tr className="border-b border-gray-500">
						<td className="py-2">{langPack.index.perma_stage}</td>
					</tr>
					<tr>
						<td>
							<Link href={`/stages/cc/CC9_盐风溶洞`}>
								<div
									className={`py-2 hover:cursor-pointer hover:bg-gray-600 text-indigo-300  ${getTheme()}`}
								>
									{langPack.盐风溶洞}
								</div>
							</Link>
						</td>
					</tr>
					<tr>
						<td className="border-y border-gray-500 py-2">
							{langPack.index.daily_stage}
						</td>
					</tr>
					<tr>
						<td
							className={`grid grid-cols-4 md:grid-cols-7 relative ${getTheme()}`}
						>
							{dailyCCArr}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}
