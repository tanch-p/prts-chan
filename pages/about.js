import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import { useAppContext } from "context/AppContext";

export default function About({ allStagesData }) {
	const { language, device } = useAppContext();
	// const langPack = require(`../components/lang/${language}.json`);

	return (
		<Layout>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			{language === "jp" ? (
				<div id="home-container" className="min-h-[100vh] font-jp px-4 md:px-0">
					<p className="text-lg font-semibold py-2">このサイトについて</p>
					<p className="lg:max-w-xl my-3">
						このサイトは補正が掛かった敵のデータを可視化するように、統合戦略のために作りました。統合戦略はまだ先なので、試しに危機契約のステージを加えました。まだまだ開発中なので、もしバグや不具合または改善したところを見つかったら、ディスコード
						@xiiao#0613にまでお知らせてください。
					</p>
					<dl className="flex flex-wrap flex-row w-full overflow-hidden m-0 p-0  max-w-[700px]">
						<dt className="border-y border-gray-200 border-collapse py-2 font-semibold w-[25%] md:w-[17%]">
							管理人
						</dt>
						<dd className="border-y border-gray-200 border-collapse py-2 w-[75%] md:w-[83%]">
							<a
								href="https://github.com/tanch-p"
								className="underline text-blue-700"
								target="_blank"
								rel="noopener noreferrer"
							>
								Chor
							</a>
						</dd>
						<dt className="border-y border-gray-200 border-collapse py-2 font-semibold w-[25%] md:w-[17%]">
							メール
						</dt>
						<dd className="border-y border-gray-200 border-collapse py-2 w-[75%] md:w-[83%]">
							prtschan@gmail.com
						</dd>

						<dt className="border-y border-gray-200 border-collapse py-2 font-semibold w-[25%] md:w-[17%]">
							ツイーター
						</dt>
						<dd className="border-y border-gray-200 border-collapse py-2 w-[75%] md:w-[83%]">
							<a
								href="https://twitter.com/prts_chan"
								className="underline text-blue-700"
								target="_blank"
								rel="noopener noreferrer"
							>
								@prts_chan
							</a>
						</dd>
					</dl>
				</div>
			) : (
				<div id="home-container" className="min-h-[100vh] font-sans px-4 md:px-0">
					<p className="text-lg font-semibold py-2">About this site:</p>
					<p className="lg:max-w-xl my-3">
						This website was created with the goal of being able to see the
						actual numbers of enemy stats with modifiers in mind, for Integrated
						Strategies (IS) gameplay. As IS is only coming few months later,
						this beta version for CC was made. If you find any bugs/mistakes or
						have any feedback, please kindly contact me on Discord @xiiao#0613.
					</p>
					<dl className="flex flex-wrap flex-row w-full overflow-hidden m-0 p-0  max-w-[700px]">
						<dt className="border-y border-gray-200 border-collapse py-2 font-semibold w-[25%] md:w-[17%]">
							Webmaster
						</dt>
						<dd className="border-y border-gray-200 border-collapse py-2 w-[75%] md:w-[83%]">
							<a
								href="https://github.com/tanch-p"
								className="underline text-blue-700"
								target="_blank"
								rel="noopener noreferrer"
							>
								Chor
							</a>
						</dd>
						<dt className="border-y border-gray-200 border-collapse py-2 font-semibold w-[25%] md:w-[17%]">
							Email
						</dt>
						<dd className="border-y border-gray-200 border-collapse py-2 w-[75%] md:w-[83%]">
							prtschan@gmail.com
						</dd>

						<dt className="border-y border-gray-200 border-collapse py-2 font-semibold w-[25%] md:w-[17%]">
							Twitter
						</dt>
						<dd className="border-y border-gray-200 border-collapse py-2 w-[75%] md:w-[83%]">
							<a
								href="https://twitter.com/prts_chan"
								className="underline text-blue-700"
								target="_blank"
								rel="noopener noreferrer"
							>
								@prts_chan
							</a>
						</dd>
					</dl>
				</div>
			)}
		</Layout>
	);
}
