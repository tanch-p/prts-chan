import Image from "next/image";
import { useEffect } from "react";

export default function Daily_buttons({ ccConfig, handleClick, language,toggleOptionColor }) {
  const rank = [1, 2, 3];

  return (
    <>
      <div className="flex flex-wrap flex-row w-full h-[350px] max-w-[900px] overflow-x-scroll">
        {rank.map((num) => (
          <div
            className="border max-w-[250px] min-h-[30px] mx-4"
            key={`rank${num}`}
          >
            Risk:{" "}
            <Image
              src={`/images/cc_buttons/rank${num}.png`}
              alt={`rank${num}`}
              width="65px"
              height="29px"
              className="overflow-hidden"
            />
            <div className="flex flex-wrap flex-col">
              {ccConfig.map((category) =>
                category[`options`].map((option) => {
                  if (option.rank === num) {
                    return (
                      <div
                        className={`border w-[150px] h-[50px] my-2 ${toggleOptionColor(
                          category.category,
                          option.img
                        )} cursor-pointer`}
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
                        />
                        {option.name[language]}
                      </div>
                    );
                  }
                })
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
