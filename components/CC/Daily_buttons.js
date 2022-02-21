import Image from "next/image";
import Risk_triangle from "./Risk_triangle";

export default function Daily_buttons({
  ccConfig,
  handleClick,
  language,
  toggleOptionColor,
  getRankColor
}) {
  const rank = [1, 2, 3];

  return (
    <>
      <div className="flex flex-wrap flex-row w-full h-[350px] max-w-[900px] overflow-x-scroll select-none">
        {rank.map((num) => (
          <div
            className="border max-w-[250px] min-h-[30px] mx-4 bg-gray-600"
            key={`rank${num}`}
          >
            <div className="rounded flex flex-wrap flex-row h-[24px]">
              <p className={`text-white ${getRankColor(num)} rounded-l px-1`}>危機等級</p>
              <Risk_triangle risk={num} type={"daily"}/>
            </div>
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
