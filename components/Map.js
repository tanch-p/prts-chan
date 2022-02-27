import Image from "next/image";

export default function Map({ mapConfig, language, device, fontThemes }) {
  // console.log(mapConfig)
  //base 1062 x 600
  // console.log(mapConfig);
  const width = Math.floor((1062 * 3) / 5);
  const height = Math.floor((600 * 3) / 5);
  return (
    <>
      <div className="mt-2 font-semibold text-xl">
        <div className={`${fontThemes[language]}`}>
          {mapConfig.name[language]}
        </div>
        <Image
          priority
          src={`/images/maps/${mapConfig.img}.webp`}
          alt={mapConfig.name[language]}
          width={width}
          height={height}
          className=""
        ></Image>
        <div className="w-full">{/* <h2>Map stats</h2> */}</div>
      </div>
    </>
  );
}
