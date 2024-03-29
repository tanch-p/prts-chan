import Link from "next/link";
import { useAppContext } from "context/AppContext";
import { useState } from "react";
import Image from "next/image";
import { artifactSVG, downArrowSVG } from "../svg";
import FloorTitle from "../IS/Floor_title";

const IS_THEMES = ["phcs"];

export const Navbar = ({ open, setOpen, device, theme }) => {
	const { language, setLanguage, hallucinations } = useAppContext();
	const [menuOpen, setMenuOpen] = useState(false);

	const languageOptions = [
		// { name: "简体中文", code: "cn" },
		{ name: "English", code: "en" },
		{ name: "日本語", code: "jp" },
	];

	const getThemeStyles = (theme) => {
		switch (theme) {
			case "phcs":
				return `bg-neutral-800 text-white fixed top-0 ${
					hallucinations.length > 0 ? "h-24" : "h-16"
				} `;
			default:
				return "bg-gray-200 text-gray-700 dark:bg-[#131313] dark:text-white border-b dark:border-none dark:shadow-lg border-gray-400";
		}
	};

	return (
		<>
			<nav
				className={`w-[100vw] md:w-full px-6 md:px-0 z-10 ${getThemeStyles(
					theme
				)}   ${language === "jp" ? "" : ""}`}
			>
				<div
					className={`grid grid-cols-3 place-items-center max-w-7xl mx-auto h-16`}
				>
					<div
						className={`flex items-center relative justify-self-start px-4  ${
							IS_THEMES.includes(theme)
								? "self-start mt-[18px] invisible md:visible md:block"
								: ""
						}`}
					>
						<button
							aria-label="Open Menu"
							className={`hidden ${
								device === "mobile" ? "mx-2 h-0 w-0" : " mr-2"
							} opacity-0`}
							onClick={() => setOpen(!open)}
							disabled={true}
						>
							{downArrowSVG}
						</button>

						<Link href={`/`}>
							<a className="text-xl font-bold min-w-min whitespace-nowrap">
								PRTSちゃん
							</a>
						</Link>
						{IS_THEMES.includes(theme) ? null : (
							<Link href={`/about`}>
								<a className="pl-2 ml-2 md:ml-4 font-medium">About</a>
							</Link>
						)}
					</div>
					{IS_THEMES.includes(theme) ? (
						<FloorTitle theme={theme} />
					) : (
						<div></div>
					)}
					<div
						className={`text-left relative justify-self-end md:mr-12 ${
							IS_THEMES.includes(theme)
								? "self-start mt-[13px] hidden md:block"
								: ""
						}`}
					>
						<div>
							<button
								type="button"
								className={`inline-flex  w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none `}
								id="menu-button"
								onClick={() => {
									setMenuOpen(!menuOpen);
								}}
							>
								<p className="whitespace-nowrap">
									{language === "jp" ? "言語：" : "Language: "}
									<span className="font-bold">{`${language.toUpperCase()}`}</span>
								</p>
								{/* <!-- Heroicon name: solid/chevron-down --> */}
								<svg
									className="-mr-1 ml-2 h-5 w-5"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
									aria-hidden="true"
								>
									<path
										fillRule="evenodd"
										d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
										clipRule="evenodd"
									/>
								</svg>
							</button>
						</div>

						{menuOpen ? (
							<div
								className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-30"
								role="menu"
								aria-orientation="vertical"
								aria-labelledby="menu-button"
								tabIndex="-1"
							>
								<div className="py-1 w-full z-30">
									{/* <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" --> */}
									{languageOptions.map(({ name, code }) => (
										<a
											className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-300 w-full text-left"
											role="menuitem"
											tabIndex="-1"
											id="menu-item-0"
											key={name}
											onClick={() => {
												setMenuOpen(!menuOpen);
												setLanguage(code);
											}}
										>
											{name}
										</a>
									))}
								</div>
							</div>
						) : null}
					</div>
				</div>
			</nav>
		</>
	);
};
