import Image from "next/image";

export default function EnemySimple({ stageData }) {
  // console.log(stageData);

  //return table of enemy data
  const tableHeaders = [
    "enemy",
    "type",
    "atk_type",
    "hp",
    "atk",
    "aspd",
    "def",
    "mdef",
    "weight",
    "remarks",
  ];

  return (
    <>
      <table className="border border-gray-400 border-solid mx-auto">
        <thead>
          <tr>
            {tableHeaders.map((ele) => (
              <th
                className="border border-gray-400 border-solid py-0.5 px-1.5 min-w-[50px]"
                key={ele}
              >
                {ele === "aspd"
                  ? ele + "/s"
                  : ele === "atk_type"
                  ? "atk type"
                  : ele}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {stageData.mapConfig.enemies.map(({ id, count }, index) => {
            //get enemydata file
            //map through enemydata
            let enemy = require(`../enemy_data/${id}.json`);
            // console.log(enemy);
            return (
              <>
                <tr className={`${index % 2 === 1 ? "bg-neutral-100" : ""}`}>
                  {tableHeaders.map((ele) => {
                    return (
                      <td
                        className="border border-gray-400 py-0 mx-2 min-w-[50px] max-w-[300px] text-center max-h-[75px]"
                        key={enemy.name + ele}
                      >
                        {ele === "enemy" ? (
                          <Image
                            src={`/enemy_icons/${id}.png`}
                            alt={stageData.name}
                            height="75px"
                            width="75px"
                            className=""
                          />
                        ) : ele === "count" ? (
                          count
                        ) : ele === "remarks" ? (
                          enemy.special
                        ) : ele === "atk_type" ? (
                          enemy.atk_type_en
                        ) : ele === "type" ? (
                          enemy["type_en"].map((type)=> <p>{type}</p>)
                        ) :(
                          enemy[ele]
                        )}
                      </td>
                    );
                  })}
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
