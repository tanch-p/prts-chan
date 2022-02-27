import Image from "next/image";
import Risk_triangle from "./Risk_triangle";

export default function Daily_buttons({
  ccConfig,
  handleClick,
  language,
  toggleOptionColor,
  getRankColor,
}) {
  const rank = [1, 2, 3];

  return (
    <>
      <div className="flex flex-wrap flex-row w-[120vw] md:min-h-min md:w-full md:max-w-[900px] select-none bg-neutral-300 overflow-x-scroll md:overflow-hidden">
        {rank.map((num) => (
          <div
            className="border md:max-w-[250px] min-h-[30px] mx-2 mb-2 bg-[rgb(153,159,163)]"
            key={`rank${num}`}
          >
            <div className="rounded flex flex-wrap flex-row h-[24px] mb-1">
              <p className={`text-white ${getRankColor(num)} rounded-l px-1`}>
                危機等級
              </p>
              <Risk_triangle risk={num} type={"daily"} />
            </div>
            <div className="flex flex-wrap flex-col">
              {ccConfig.map((category) =>
                category[`options`].map((option) => {
                  if (option.rank === num) {
                    return (
                      <div
                        className={`flex flex-wrap flex-row place-items-center rounded  md:min-w-min h-[50px] mx-2 my-2 active:brightness-75  ${toggleOptionColor(
                          category.category,
                          option.img,
                          "daily"
                        )} bg-neutral-100 cursor-pointer`}
                        onClick={() => handleClick(category, option)}
                      >
                        <Image
                          src={`/images/cc_buttons/${option.img}.png`}
                          alt={`${option.name[language]}`}
                          width="50px"
                          height="50px"
                          className={` ${
                            toggleOptionColor(
                              category.category,
                              option.img,
                              "daily"
                            ) === ""
                              ? "bg-[rgb(153,159,163)]"
                              : ""
                          } `}
                        />
                        <p className={` px-2 ${language==="en" ? "text-sm font-semibold md:w-[150px]" : "font-medium md:w-[145px]"}`}>
                          {option.name[language]}
                        </p>
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
