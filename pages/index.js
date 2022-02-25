import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Layout, { siteTitle } from "../components/layout";
import { getSortedStagesData } from "../lib/stages";
import { useContext, useEffect } from "react";
import AppContext from "../components/AppContext";
import dayjs from "dayjs";

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
  const { languageContext } = useContext(AppContext);
  const [language] = languageContext;
  const langPack = require(`../components/lang/${language}.json`);
  const firstCCDate = dayjs("3/13");
  firstCCDate.add(1, "day").format("M/DD");
  const stagesList = [""];

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div id="home-container" className="min-h-[100vh] font-jp">
        {/* <Image
          src="/images/profile.jpg"
          className="inline-block"
          height={144}
          width={144}
          alt={""}
        /> */}

        <div id="cc6" className="w-[100vw] lg:min-w-10">
          <div></div>
          <div>Permanent Stage</div>
          <div>
            <Link href={`/stages/cc6-perma`}>
              <a className="underline text-blue-700">狂嚎沙原</a>
            </Link>
          </div>
          <div>
            <div>Daily Stages</div>
            <div>Date</div>
            <div>Stage</div>
          </div>
        </div>
        <div>Coming Soon</div>
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
