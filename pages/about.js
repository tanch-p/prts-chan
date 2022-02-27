import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import AppContext from "../components/AppContext";
import { useContext } from "react";

export default function About({ allStagesData }) {
  const { languageContext } = useContext(AppContext);
  const [language] = languageContext;
  // const langPack = require(`../components/lang/${language}.json`);

  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      {language === "jp" ? (
        <div id="home-container" className="min-h-[100vh] font-jp">
          <p className="text-lg font-semibold py-2">このサイトについて</p>
          <p className="lg:max-w-xl my-3">
            このサイトは補正が掛かった敵のデータを可視化するように、統合戦略のために作りました。統合戦略はまだ先なので、試しに危機契約のステージを加えました。まだまだ開発中なので、もしバグや不具合または改善したところを見つかったら、メールをお願いいたします。
          </p>
          <div className="border-y border-gray-200 border-collapse py-2">
            <span className="font-semibold">管理人：</span>{" "}
            <a
              href="https://github.com/tanch-p"
              className="underline text-blue-700"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chor
            </a>
          </div>
          <div className="border-y border-gray-200 border-collapse py-2">
            <span className="font-semibold">サイトメール：</span>
            <span>prtschan@gmail.com</span>
          </div>
        </div>
      ) : (
        <div id="home-container" className="min-h-[100vh] font-sans">
          <p className="text-lg font-semibold py-2">About this site:</p>
          <p className="lg:max-w-xl my-3">
            This website was created with the goal of being able to see the
            actual numbers of enemy stats with modifiers in mind, for Integrated
            Strategies (IS) gameplay. As IS is only coming few months later, this
            beta version for CC was made. If you find any bugs/mistakes or have
            any feedback, please kindly drop an email to me or open a Github
            issue.
          </p>
          <div className="border-y border-gray-200 border-collapse py-2">
            <span className="font-semibold">Webmaster：</span>{" "}
            <a
              href="https://github.com/tanch-p"
              className="underline text-blue-700"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chor
            </a>
          </div>
          <div className="border-y border-gray-200 border-collapse py-2">
            <span className="font-semibold">Site Email：</span>
            <span>prtschan@gmail.com</span>
          </div>
        </div>
      )}
    </Layout>
  );
}
