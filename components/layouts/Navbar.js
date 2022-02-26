import Link from "next/link";
import AppContext from "../AppContext";
import { useState, useContext } from "react";
import Image from "next/image";
import prts_logo from "../../public/images/PRTS.webp";

export const Navbar = ({ open, setOpen }) => {
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
			<nav className="flex w-full items-center justify-between px-6 h-16  text-gray-700 border-b border-gray-200 z-10">
				<div className="flex items-center relative">
					<button
						aria-label="Open Menu"
						className="mr-2 opacity-0"
						onClick={() => setOpen(!open)}
						disabled
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
					</button>
					{/* <Image
						priority
						src={prts_logo}
						alt={"prts logo"}
						width="52px"
            height="63px"
						className="select-none"
					/> */}
					<span className="text-xl font-bold">PRTSちゃん</span>
					<Link href={`/`}>
						<a className="pl-2">Home</a>
					</Link>
				</div>
				<div className="relative inline-block text-left">
					<div>
						<button
							type="button"
							className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
							id="menu-button"
							onClick={() => {
								setMenuOpen(!menuOpen);
							}}
						>
							Language: <span> </span>
							<span className="font-bold">{` ${language.toUpperCase()}`}</span>
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
