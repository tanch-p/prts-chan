import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Layout, { siteTitle } from "../components/layout";
import { useContext, useEffect } from "react";
import AppContext from "../components/AppContext";

//images
import CC6_banner_en from "../public/images/banners/CC6_banner_en.jpg";
import CC6_banner_jp from "../public/images/banners/CC6_banner_jp.jpg";

export default function Home({ allStagesData }) {
  const { languageContext, device } = useContext(AppContext);
  const [language] = languageContext;
  const langPack = require(`../components/lang/${language}.json`);

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
