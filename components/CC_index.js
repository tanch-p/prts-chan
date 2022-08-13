import Image from "next/image";
import Link from "next/link";
import CC8_banner from "@/public/images/banners/CC8_banner.webp";

export default function CCIndex({ language, langPack }) {
  const getTheme = () => {
    return language === "en" ? "text-xs" : "";
  };
  const dailyStages = [
    { text: "沙海遗迹", link: "CC7_炽热溶洞_1" },
    { text: "沙海遗迹", link: "CC7_炽热溶洞_1" },
    { text: "无序矿区", link: "CC7_风蚀高地_1" },
    { text: "狂嚎沙原", link: "CC7_闭锁监狱_1" },
    { text: "炽热溶洞", link: "CC7_遗弃地块_1" },
    { text: "八号竞技场", link: "CC7_无序矿区_1" },
    { text: "遗弃地块", link: "CC7_八号竞技场_1" },
    { text: "灰齐山麓", link: "CC7_狂嚎沙原_1" },
    { text: "狂嚎沙原", link: "CC7_风蚀高地_2" },
    { text: "灰齐山麓", link: "CC7_狂嚎沙原_2" },
    { text: "炽热溶洞", link: "CC7_遗弃地块_2" },
    { text: "遗弃地块", link: "CC7_八号竞技场_2" },
    { text: "八号竞技场", link: "CC7_无序矿区_2" },
    { text: "沙海遗迹", link: "CC7_炽热溶洞_2" },
  ];

  const dailyCCArr = [];

  for (const [index, { text, link }] of dailyStages.entries()) {
    dailyCCArr.push(
      <>
        <div className="border-b border-gray-500 mt-1" key={link}>
          <div className="h-min w-full text-sm py-1">
            {`8/${index + 30}`}
          </div>
          <Link href={`/stages/cc/${link}`}>
            <div
              className={`flex items-center justify-center ${
                language === "jp" ? "text-sm" : "text-xs"
              } hover:cursor-pointer hover:bg-gray-600 w-full min-h-[40px] text-indigo-300`}
            >
              <p className="py-2 px-2 md:whitespace-nowrap">{langPack[text]}</p>
            </div>
          </Link>
        </div>
      </>
    );
  }
  return (
    <div id="cc6" className="max-w-screen-sm md:max-w-3xl mb-24">
      <div className="relative shadow-2xl max-w-screen-sm md:max-w-3xl md:mt-8">
        <Image
          src={CC8_banner}
          layout="intrinsic"
          alt="phantom and crimson solitaire"
          className="hover:cursor-pointer"
        />
      </div>
      <table className="border border-gray-500 border-collapse w-full text-center align-middle">
        <tbody>
          <tr className="border-y border-gray-500">
            <td className="py-2">{langPack.index.perma_stage}</td>
          </tr>
          <tr>
            <td>
              <Link href={`/stages/cc/cc7-perma`}>
                <div className={`py-2 hover:cursor-pointer hover:bg-gray-600 text-indigo-300  ${getTheme()}`}>
                  {langPack.大骑士领酒吧街}
                </div>
              </Link>
            </td>
          </tr>
          <tr>
            <td className="border-y border-gray-500 py-2">
              {langPack.index.daily_stage}
            </td>
          </tr>
          <tr>
            <td
              className={`grid grid-cols-4 md:grid-cols-7 relative ${getTheme()}`}
            >
              {dailyCCArr}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
