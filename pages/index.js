import Head from "next/head";
import Link from "next/link";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";

import { getSortedStagesData } from "../lib/stages";

export async function getStaticProps() {
  const allStagesData = getSortedStagesData();
  console.log("allStagesData", allStagesData);
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
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Stages</h2>
        <ul className={utilStyles.list}>
          {/* {allPostsData.map(({ id, da	te, title }) => (
						<li className={utilStyles.listItem} key={id}>
							{title}
							<br />
							{id}
							<br />
							{date}
						</li>
					))} */}
          {allStagesData.map(({ name }) => (
            <li className={utilStyles.listItem} key={name}>
              <Link href={`/stages/${name}`}>
                <a>{name}</a>
              </Link>
              <br />
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
