import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Layout, { siteTitle } from "../components/layout";
import { getSortedStagesData } from "../lib/stages";
import { useContext, useEffect } from "react";
import AppContext from "../components/AppContext";
import dayjs from "dayjs";

//images
import CC6_banner_en from "../public/images/banners/CC6_banner_en.jpg";
import CC6_banner_jp from "../public/images/banners/CC6_banner_jp.jpg";

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
  const { languageContext, device } = useContext(AppContext);
  const [language] = languageContext;
  const langPack = require(`../components/lang/${language}.json`);
  const firstCCDate = dayjs("3/1");
  const dailyStages =
    language === "en"
      ? [
          "Area 6",
          "Area 6",
          "Abandoned Plot",
          "Deserted Factory",
          "Locked-Down Prison",
          "Arena 8",
          "Windswept Highland",
          "Abandoned Mine",
          "Deserted Factory",
          "Abandoned Plot",
          "Arena 8",
          "Abandoned Mine",
          "Windswept Highland",
          "Locked-Down Prison",
        ]
      : [
          "第6区跡",
          "第6区跡",
          "棄てられし区画",
          "廃工場",
          "閉鎖監獄",
          "8号競技場",
          "風蝕の高原",
          "無秩序な鉱区",
          "廃工場",
          "棄てられし区画",
          "8号競技場",
          "無秩序な鉱区",
          "風蝕の高原",
          "閉鎖監獄",
        ];
  const dailyCCArr = [];
  const links = [
    "CC6_第6区跡",
    "CC6_第6区跡",
    "CC6_棄てられし区画_1",
    "CC6_廃工場_1",
    "CC6_閉鎖監獄_1",
    "CC6_8号競技場_1",
    "CC6_風蝕の高原_1",
    "CC6_無秩序な鉱区_1",
    "CC6_廃工場_2",
    "CC6_棄てられし区画_2",
    "CC6_8号競技場_2",
    "CC6_無秩序な鉱区_2",
    "CC6_風蝕の高原_2",
    "CC6_閉鎖監獄_2",
  ];

  for (let i = 0; i < dailyStages.length; i++) {
    dailyCCArr.push(
      <>
        <div className="flex flex-wrap flex-col w-[25%] md:w-min">
          <div className="border border-collapse border-gray-400 h-[25px] w-full md:w-[80px] text-base">
            {`3/${i + 1}`}
          </div>
          {i > 11 ? (
            <div
              className={`border border-collapse border-gray-400 ${
                language === "jp" ? "text-sm" : "text-xs"
              }  h-[40px] w-full md:w-[80px] `}
            >
              <p className="">{dailyStages[i]}</p>
            </div>
          ) : (
            <Link href={`/stages/${links[i]}`}>
              <div
                className={`border border-collapse border-gray-400 ${
                  language === "jp" ? "text-sm" : "text-xs"
                } hover:cursor-pointer hover:bg-gray-300 h-[40px] w-full md:w-[80px] underline text-blue-700`}
              >
                <p className="">{dailyStages[i]}</p>
              </div>
            </Link>
          )}
        </div>
      </>
    );
  }

  const getTheme = () => {
    return language === "en" ? "text-xs" : "";
  };

  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div
        id="home-container"
        className={`flex flex-col min-h-[100vh] place-content-center ${
          language === "jp" ? "font-jp" : "font-sans"
        }`}
      >
        <div id="cc6" className="w-full md:min-w-10">
          <table className="text-center align-middle">
            <div className="relative w-[95vw] mx-auto md:w-[560px]">
              {language === "jp" ? (
                <Image
                  src={CC6_banner_jp}
                  className="inline-block"
                  alt={"CC6"}
                />
              ) : (
                <Image
                  src={CC6_banner_en}
                  className="inline-block"
                  alt={"CC6"}
                />
              )}
            </div>
            <tr className="border border-collapse border-gray-400 py-1">
              <th> {language === "jp" ? "常設ステージ" : "Permanent Stage"}</th>
            </tr>
            <Link href={`/stages/cc6-perma`}>
              <div className="border border-collapse py-2 border-gray-400 text-base hover:cursor-pointer hover:bg-gray-300 underline text-blue-700">
                {language === "jp" ? "狂風の砂原" : "Howling Desert"}
              </div>
            </Link>
            <tr>
              <th className="border border-collapse border-gray-400 py-1">
                {language === "jp" ? "デイリーステージ" : "Daily Stages"}
              </th>
            </tr>
            <div>
              <div
                className={`flex flex-wrap flex-row relative w-[95vw] md:w-[560px] ${getTheme()}`}
              >
                {dailyCCArr}
              </div>
            </div>
          </table>
        </div>
        <div className="w-100vw ml-2 md:ml-0 md:w-[560px] mt-6">
          <ul>
            {language === "jp" ? (
              <li className="  ">
                3/1更新→計算式に間違いがあったので修正、影響された敵は常設ステージの「ティアカウ呪術師」の防御力。
              </li>
            ) : (
              <li className="">
              3/1 Update: Fixed multiplier formula to correctly reflect CC options +def and %def priority, units affected: Tiacauh Ritualist
            </li>
            )}
          </ul>
        </div>
      </div>
    </Layout>
  );
}
