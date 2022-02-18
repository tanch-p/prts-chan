import Image from "next/image";
import { getRemarks } from "./getStats";

export default function EnemySimple({ stageData, multiplier, ccMods }) {
  console.log(ccMods);
  // console.log(stageData);
  //return table of enemy data
  const tableHeaders = [
    "enemy",
    "type",
    "hp",
    "atk",
    "aspd",
    "def",
    "mdef",
    "weight",
    "remarks",
  ];

  const textAlign = (ele) => {
    return ele === "type" || ele === "atk" || ele === "remarks" || ele === "def"
      ? "text-left px-[5.5px]"
      : "text-center";
  };

  const parseSpecial = (enemy, param, stats, base_stat) => {
    if (!enemy.special.hasOwnProperty(param)) {
      return [];
    } else {
      if (param === "atk") {
        return enemy.special[param].map((skill) => {
          if (stageData.mapConfig.isCC) {
            if (ccMods.hasOwnProperty(enemy.id)) {
              if (ccMods[enemy.id].hasOwnProperty(skill.name)) {
                if (enemy["stats"][stats].hasOwnProperty(skill.name)) {
                  return (
                    <p>
                      <span>
                        {(
                          base_stat *
                            enemy["stats"][stats][skill.name].multiplier +
                          enemy["stats"][stats][skill.name].fixedInc
                        ).toFixed(0)}
                      </span>
                      {` (${skill.type["jp"]})`}
                    </p>
                  );
                } else {
                  return (
                    <p>
                      <span>
                        {(
                          base_stat * skill.multiplier +
                          skill.fixedInc
                        ).toFixed(0)}
                      </span>
                      {` (${skill.type["jp"]})`}
                    </p>
                  );
                }
              }
            }
          }
          if (enemy["stats"][stats].hasOwnProperty(skill.name)) {
            return (
              <p>
                <span>
                  {(
                    base_stat * enemy["stats"][stats][skill.name].multiplier +
                    enemy["stats"][stats][skill.name].fixedInc
                  ).toFixed(0)}
                </span>
                {` (${skill.type["jp"]})`}
              </p>
            );
          } else {
            return (
              <p>
                <span>
                  {(base_stat * skill.multiplier + skill.fixedInc).toFixed(0)}
                </span>
                {` (${skill.type["jp"]})`}
              </p>
            );
          }
        });
      } else {
        return enemy.special[param].map((skill) => {
          if (stageData.mapConfig.isCC) {
            if (ccMods.hasOwnProperty(enemy.id)) {
              if (ccMods[enemy.id].hasOwnProperty(skill.name)) {
                if (enemy["stats"][stats].hasOwnProperty(skill.name)) {
                  return (
                    <p>{`${(
                      <span>
                        {(
                          base_stat *
                            enemy["stats"][stats][skill.name].multiplier +
                          enemy["stats"][stats][skill.name].fixedInc
                        ).toFixed(0)}
                      </span>
                    )} (${skill.type["jp"]})`}</p>
                  );
                } else {
                  return (
                    <p className="text-rose-600">{`${(
                      base_stat * ccMods[enemy.id][skill.name].multiplier +
                      ccMods[enemy.id][skill.name].fixedInc
                    ).toFixed(0)} (${skill.type["jp"]})`}</p>
                  );
                }
              }
            }
          }

          if (enemy["stats"][stats].hasOwnProperty(skill.name)) {
            return (
              <p>{`${(
                <span>
                  {(
                    base_stat * enemy["stats"][stats][skill.name].multiplier +
                    enemy["stats"][stats][skill.name].fixedInc
                  ).toFixed(0)}
                </span>
              )} (${skill.type["jp"]})`}</p>
            );
          } else {
            return (
              <p>{`${(base_stat * skill.multiplier + skill.fixedInc).toFixed(
                0
              )} (${skill.type["jp"]})`}</p>
            );
          }
        });
      }
    }
  };

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
          {stageData.mapConfig.enemies.map(({ id, count, stats }, index) => {
            //get enemydata file
            //map through enemydata
            let enemy = require(`../enemy_data/${id}.json`);
            // console.log(enemy["stats"][stats]);
            return (
              <>
                <tr className={`${index % 2 === 1 ? "bg-neutral-100" : ""}`}>
                  {tableHeaders.map((ele) => {
                    return (
                      <td
                        className={`border border-gray-400 py-0 mx-2 min-w-[50px] max-w-[300px] ${textAlign(
                          ele
                        )}  max-h-[75px]`}
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
                        ) : ele === "type" ? (
                          enemy["type"]["jp"].map((type) => <p>{type}</p>)
                        ) : ele === "atk" ? (
                          [
                            <p>{`${
                              enemy["stats"][stats][ele] *
                                (multiplier?.["ALL"]?.[ele] ?? 1) *
                                (multiplier?.[id]?.[ele] ?? 1) +
                              (multiplier?.["ALL"]?.[`fixed-${ele}`] ?? 0)
                            } ${
                              enemy.normal_attack.hits !== 1
                                ? `x ${enemy.normal_attack.hits}`
                                : ""
                            } (${enemy.normal_attack.type[`${"jp"}`]})`}</p>,
                          ].concat(
                            parseSpecial(
                              enemy,
                              ele,
                              stats,
                              enemy["stats"][stats][ele] *
                                (multiplier?.["ALL"]?.[ele] ?? 1) *
                                (multiplier?.[id]?.[ele] ?? 1) +
                                (multiplier?.["ALL"]?.[`fixed-${ele}`] ?? 0)
                            )
                          )
                        ) : ele === "weight" || ele === "mdef" ? (
                          +enemy["stats"][stats][ele] +
                          (multiplier?.["ALL"]?.[ele] ?? 0) +
                          (multiplier?.[id]?.[ele] ?? 0)
                        ) : ele === "aspd" ? (
                          (
                            enemy["stats"][stats][ele] /
                            ((multiplier?.["ALL"]?.[ele] ?? 1) +
                              (multiplier?.[id]?.[ele] ?? 1) -
                              1)
                          ).toFixed(2)
                        ) : ele === "remarks" ? (
                          getRemarks(enemy, stageData.mapConfig.isCC, ccMods)
                        ) : (
                          [
                            <p>
                              {Math.round(
                                enemy["stats"][stats][ele] *
                                  (multiplier?.["ALL"]?.[ele] ?? 1) *
                                  (multiplier?.[id]?.[ele] ?? 1) +
                                  (multiplier?.["ALL"]?.[`fixed-${ele}`] ?? 0)
                              )}
                            </p>,
                          ].concat(
                            parseSpecial(
                              enemy,
                              ele,
                              stats,
                              enemy["stats"][stats][ele] *
                                (multiplier?.["ALL"]?.[ele] ?? 1) *
                                (multiplier?.[id]?.[ele] ?? 1) +
                                (multiplier?.["ALL"]?.[`fixed-${ele}`] ?? 0)
                            )
                          )
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
