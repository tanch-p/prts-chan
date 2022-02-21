import Image from "next/image";
import Risk_triangle from "./Risk_triangle";

export default function Perma_buttons({
  ccConfig,
  handleClick,
  language,
  toggleOptionColor,
  getRankColor,
  showGrid,
  toggleRankColor
}) {
  const rank = [1, 2, 3];

  return (
    <>
      <div className="flex flex-wrap flex-col w-full h-[215px] max-w-[900px] overflow-x-scroll select-none relative">
        <div className="bg-[#545753] sticky left-0 z-10 border-x border-gray-700">
          {rank.map((num) => (
            <div
              className="  min-w-[50px] max-w-[100px] h-[65px] flex items-center "
              key={`rank${num}`}
            >
              <div className="leading-[10px] mx-[4px]">
                <p className="text-[10px] text-gray-200 mb-1">Contigency <br/> Level</p>
                <Risk_triangle risk={num} />
              </div>
              <span className="text-white text-[50px] mr-[2px]">{num}</span>
            </div>
          ))}
        </div>
        {ccConfig.map((category) =>
          category[`options`].map((option) => (
            <div
              className={`${showGrid ? "border-[1px]" : ""} border-collapse w-[65px] h-[65px] p-[1.5px] ${toggleRankColor ? getRankColor(
                option.rank
              ) : "bg-[#90928f]"}`}
            >
              {Object.keys(option).includes("img") ? (
                <button
                  type="button"
                  onClick={() =>
                    handleClick(
                      category.category,
                      option.img,
                      option.tooltip[language],
                      category.target,
                      option.effect,
                      option.rank
                    )
                  }
                >
                  <Image
                    src={`/images/cc_buttons/${option.img}.png`}
                    alt={`${option.tooltip_en}`}
                    width="75px"
                    height="75px"
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
