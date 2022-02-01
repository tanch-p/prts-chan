import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
// import utilStyles from "../styles/utils.module.css";

// import { getSortedPostsData } from "../lib/posts";
import { getSortedStagesData } from "../lib/stages";

export async function getStaticProps() {
	const allStagesData = getSortedStagesData();
	return {
		props: {
			allStagesData,
		},
	};

}

export default function Home({ allStagesData }) {
	return (
		<Layout home>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<section className={`${""} ${""}`}>
				<h2 className="">Blog</h2>
				<ul className="">
					{/* {allPostsData.map(({ id, da	te, title }) => (
						<li className={utilStyles.listItem} key={id}>
							{title}
							<br />
							{id}
							<br />
							{date}
						</li>
					))} */}
					{allStagesData.map(({ name}) => (
						<li className="" key={name}>
							{name}
						</li>
					))}
				</ul>
			</section>
		</Layout>
	);
}
