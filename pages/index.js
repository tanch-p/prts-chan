import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";

// import { getSortedPostsData } from "../lib/posts";
import { getStageData } from "../lib/stages";

export async function getStaticProps() {
	const allStageData = getStageData();
	return {
		props: {
			allStageData,
		},
	};

}

export default function Home({ allPostsData }) {
	return (
		<Layout home>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
				<h2 className={utilStyles.headingLg}>Blog</h2>
				<ul className={utilStyles.list}>
					{/* {allPostsData.map(({ id, date, title }) => (
						<li className={utilStyles.listItem} key={id}>
							{title}
							<br />
							{id}
							<br />
							{date}
						</li>
					))} */}
					{allStageData.map(({ name}) => (
						<li className={utilStyles.listItem} key={name}>
							{name}
						</li>
					))}
				</ul>
			</section>
		</Layout>
	);
}
