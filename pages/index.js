import Head from "next/head";
import Link from "next/link";
import Layout, { siteTitle } from "../components/layout";
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
      <section className="">
        <h2 className="" >Stages</h2>
        <ul className="" >
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
            <li className="" key={name}>
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
