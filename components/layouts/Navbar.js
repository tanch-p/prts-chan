import Link from "next/link";
import AppContext from "../AppContext";
import { useState, useContext } from "react";
import Image from "next/image";
import { artifactSVG, downArrowSVG } from "../svg";

export const Navbar = ({ open, setOpen, device }) => {
	const { languageContext } = useContext(AppContext);
	const [language, setLanguage] = languageContext;
	const [menuOpen, setMenuOpen] = useState(false);

	const languageOptions = [
		// { name: "简体中文", code: "cn" },
		{ name: "English", code: "en" },
		{ name: "日本語", code: "jp" },
	];

	return (
		<>
			<nav
				className={`flex bg-gray-200 w-[100vw] md:w-full items-center justify-between ${
					device === "mobile" ? "" : "px-6"
				}   h-16  text-gray-700 border-b border-gray-400 z-10 ${
					language === "jp" ? "font-jp" : "font-sans"
				}`}
			>
				<div className="flex items-center relative">
					<button
						aria-label="Open Menu"
						className={`${
							device === "mobile" ? "mx-2 h-0 w-0" : " mr-2"
						} opacity-0`}
						onClick={() => setOpen(!open)}
						disabled={true}
					>
						{downArrowSVG}
					</button>
					{/* <Image
						priority
						src={prts_logo}
						alt={"prts logo"}
						width="52px"
            height="63px"
						className="select-none"
					/> */}
					<Link href={`/`}>
						<a className="text-xl font-bold min-w-min">PRTSちゃん</a>
					</Link>
					{device === "mobile" ? null : (
						<>
							<Link href={`/`}>
								<a className="pl-2 mx-2 font-medium">Home</a>
							</Link>
						</>
					)}
					<Link href={`/about`}>
						<a className="pl-2 font-medium">About</a>
					</Link>
				</div>
				<div className="w-20">{artifactSVG}</div>
				<div className={`text-left mr-2 relative`}>
					<div>
						<button
							type="button"
							className={`inline-flex  w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none `}
							id="menu-button"
							onClick={() => {
								setMenuOpen(!menuOpen);
							}}
						>
							<p>
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

					{/* Dropdown menu, show/hide based on menu state.

    Entering: "transition ease-out duration-100"
      From: "transform opacity-0 scale-95"
      To: "transform opacity-100 scale-100"
    Leaving: "transition ease-in duration-75"
      From: "transform opacity-100 scale-100"
      To: "transform opacity-0 scale-95" */}
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
			</nav>
		</>
	);
};
