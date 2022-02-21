import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Layout, { siteTitle } from "../components/layout";
import { getSortedStagesData } from "../lib/stages";
import { useContext, useEffect } from "react";
import AppContext from "../components/AppContext";

export async function getStaticProps() {
  const allStagesData = getSortedStagesData();
  // console.log("allStagesData", allStagesData);
  return {
    props: {
      allStagesData,
    },
  };
}

export default function Home({ allStagesData }) {
  const { langPack } = useContext(AppContext);

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div id="home-container" className="min-h-[100vh]">
        <Image
          src="/images/profile.jpg"
          className="inline-block"
          height={144}
          width={144}
          alt={""}
        />
        <section className="">
          <h2 className="">{langPack?.index?.stages}</h2>
          <ul className="">
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
      </div>
    </Layout>
  );
}
