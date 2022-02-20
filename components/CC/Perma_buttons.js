import Image from "next/image";
import { useEffect } from "react";

export default function Perma_buttons({
  ccConfig,
  handleClick,
  language,
  toggleOptionColor,
}) {
  const rank = [1, 2, 3];

  const getRankColor = (rank) => {
    switch (rank) {
      case 1:
        return "bg-gray-500";
      case 2:
        return "bg-gray-800";
      case 3:
        return "bg-red-800";
    }
  };
  return (
    <>
      <div className="flex flex-wrap flex-col w-full h-[175px] max-w-[900px] overflow-x-scroll">
        {rank.map((num) => (
          <div
            className="border min-w-[50px] max-w-[60px] min-h-[50px] flex items-center"
            key={`rank${num}`}
          >
            <Image
              src={`/images/cc_buttons/rank${num}.png`}
              alt={`rank${num}`}
              width="65px"
              height="29px"
              className="overflow-hidden"
            />
          </div>
        ))}
        {ccConfig.map((category) =>
          category[`options`].map((option) => (
            <div
              className={`border w-[50px] h-[50px] ${getRankColor(
                option.rank
              )}`}
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
                    width="50px"
                    height="50px"
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
