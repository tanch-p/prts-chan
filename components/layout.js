import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import { Navbar } from "./layouts/Navbar";
import { useAppContext } from "context/AppContext";
import { Footer } from "./layouts/Footer";
import useWindowDimensions from "@/components/WindowDimensions";

export const siteTitle = "PRTS-chan";

export default function Layout({ children, theme, floor = "" }) {
	const { height, width } = useWindowDimensions();

	const { language, setLanguage, device, setDevice } = useAppContext();

	const phcs_styles = "bg-neutral-800 text-white pb-16 pt-24 md:py-24";

	useEffect(() => {
		width > 800 ? setDevice("desktop") : setDevice("mobile");
	}, [width]);

	useEffect(() => {
		let lang = navigator.language;
		console.log("browser language is", lang);
		lang = lang.match(/jp|ja/i) ? "jp" : "en";
		setLanguage(localStorage.getItem("language") ?? lang);
	}, []);

	useEffect(() => {
		localStorage.setItem("language", language);
	}, [language]);
	return (
		<>
			<Head>
				<link rel="icon" href="/favicon.ico" />
				<meta
					name="description"
					content="Arknights enemy data viewer for Roguelike"
				/>
				{/* <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        /> */}
				<meta name="og:title" content={siteTitle} />
				<meta name="twitter:card" content="summary_large_image" />

				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			</Head>
			<header className="w-[100vw]  md:w-full transition-none">
				<Navbar device={device} theme={theme} floor={floor} />
			</header>
			<main
				className={`mx-auto flex flex-wrap flex-col items-center ${phcs_styles}`}
			>
				{children}
			</main>
			<Footer />
		</>
	);
}

{
	/* <div
className={`flex flex-wrap ease-in-out duration-300 transition-[left]  motion-reduce:transition-none ${
  drawerOpen && device === "desktop"
    ? "translate-x-64 w-[calc(100%-16rem)]"
    : ""
}`}
>
</div> */
}
