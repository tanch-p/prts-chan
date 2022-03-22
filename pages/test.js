import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Layout, { siteTitle } from "../components/layout";
import { useContext, useEffect } from "react";
import AppContext from "../components/AppContext";
import Tooltip from "../components/Tooltip"

export default function Credits({ allStagesData }) {
	const { languageContext } = useContext(AppContext);
	const [language] = languageContext;
	const langPack = require(`../components/lang/${language}.json`);



	return (
		<Layout>
			<Head>
				<title>test</title>
			</Head>
			<div id="home-container" className="min-h-[100vh] font-sans">
				<Tooltip />
			</div>
		</Layout>
	);
}
