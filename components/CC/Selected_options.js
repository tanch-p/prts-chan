import Risk_triangle from "./Risk_triangle";

export default function Selected_options({ selected, ccType }) {
  return (
    <>
      <div className="overflow-scroll md:overflow-hidden">
        <div className="flex flex-wrap flex-col border-b border-b-gray-400 w-[100vw] md:w-full md:h-[300px] md:max-w-[900px] text-[12px] lg:text-md bg-[#292929] text-gray-300">
          {selected.map((option) => (
            <>
              <div>
                {/* {option.tooltip !== "" ? (
                <Risk_triangle risk={option.rank} />
              ) : null} */}
                <p
                  className={`${
                    ccType === "perma" ? "max-w-[400px]" : "max-w-[600px]"
                  } mx-2`}
                >
                  {option.tooltip}
                </p>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}
