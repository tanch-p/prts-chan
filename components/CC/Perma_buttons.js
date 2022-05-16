import Image from "next/image";
import Risk_triangle from "./Risk_triangle";
import { useState } from "react";

export default function Perma_buttons({
  ccConfig,
  handleClick,
  language,
  toggleOptionColor,
  getRankColor,
}) {
  const rank = [1, 2, 3];

  const [toggleRankColor, setToggleRankColor] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [stickyTable, setStickyTable] = useState(false);

  return (
    <>
      <div className="w-[100vw] md:w-full flex flex-wrap place-content-end mb-1">
        <button
          onClick={() => setStickyTable(!stickyTable)}
          className={`text-xs font-semibold text-center py-1 px-2 border rounded-lg  ${
            stickyTable ? "bg-gray-400" : "border-gray-400"
          }`}
        >
          {language === "jp" ? "テーブル固定" : "Anchor Table"}
        </button>
        <button
          onClick={() => setShowGrid(!showGrid)}
          className={`text-xs font-semibold text-center py-1 px-2 border rounded-lg  ${
            showGrid ? "bg-gray-400" : "border-gray-400"
          }`}
        >
          {language === "jp" ? "グリッド表示" : "Toggle Grids"}
        </button>
        <button
          onClick={() => setToggleRankColor(!toggleRankColor)}
          className={`text-xs font-semibold text-center py-1 px-2 border rounded-lg  ${
            toggleRankColor ? "bg-gray-400" : "border-gray-400"
          }`}
        >
          {language === "jp" ? "ランク色表示" : "Toggle Color"}
        </button>
      </div>
      <div
        className={`flex flex-wrap flex-col w-[100vw] md:w-full h-[214px] md:max-w-[900px] overflow-x-scroll overflow-y-hidden select-none relative ${
          stickyTable ? "sticky top-0 z-10" : ""
        }`}
      >
        <div className="bg-[#545753] lg:sticky left-0 z-10 border-x border-gray-700">
          {rank.map((num) => (
            <div
              className={`  min-w-[50px] max-w-[100px] h-[65px] flex items-center `}
              key={`rank${num}`}
            >
              <div className="leading-[10px] mx-[4px]">
                <p className="text-[10px] text-gray-200 mb-1">
                  Contigency <br /> Level
                </p>
                <Risk_triangle risk={num} />
              </div>
              <span className="text-white text-[50px] mr-[2px] font-normal font-sans">
                {num}
              </span>
            </div>
          ))}
        </div>
        {ccConfig.map((category) =>
          category[`options`].map((option) => (
            <div
              className={`${
                showGrid ? "border-[1px]" : ""
              } border-collapse w-[65px] h-[65px] p-[1.5px] ${
                option?.img !== undefined ? "active:brightness-75" : ""
              }  ${
                toggleRankColor ? getRankColor(option.rank) : "bg-[#90928f]"
              }`}
            >
              {Object.keys(option).includes("img") ? (
                <button
                  type="button"
                  onClick={() => handleClick(category, option)}
                >
                  <Image
                    src={`/images/cc_buttons/${option.img}.png`}
                    alt={`${option.img}`}
                    width="65px"
                    height="65px"
                    className={`${toggleOptionColor(
                      category.category,
                      option.img
                    )}`}
                  />{" "}
                </button>
              ) : null}
            </div>
          ))
        )}
      </div>
    </>
  );
}
