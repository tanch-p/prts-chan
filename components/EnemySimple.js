import Image from "next/image";
import { getRemarks } from "./getStats";

export default function EnemySimple({ mapConfig, multiplier, specialMods }) {
  console.log(specialMods);
  console.log(multiplier);
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

  const textAlign = (stat) => {
    return stat === "type" ||
      stat === "atk" ||
      stat === "remarks" ||
      stat === "def"
      ? "text-left px-[5.5px]"
      : "text-center";
  };

  const getMinWidth = (stat) => {
    return stat === "type" || stat === "atk" || stat === "def"
      ? "min-w-min"
      : "";
  };

  const calculate = (enemy, stats, stat) => {
    switch (stat) {
      case "aspd":
        const totalMultiplier = 1;
        if (
          multiplier?.["ALL"]?.aspd !== undefined &&
          multiplier?.["ALL"]?.aspd > 1
        ) {
          totalMultiplier += multiplier?.["ALL"]?.aspd - 1;
        }
        if (
          multiplier?.[enemy.id]?.aspd !== undefined &&
          multiplier?.[enemy.id]?.aspd > 1
        ) {
          totalMultiplier += multiplier?.[enemy.id]?.aspd - 1;
        }
        if (
          enemy.type.en.includes("Melee") &&
          multiplier.hasOwnProperty("Melee")
        ) {
          totalMultiplier += multiplier?.Melee?.aspd - 1;
        }
        if (
          enemy.type.en.includes("Ranged") &&
          multiplier.hasOwnProperty("Ranged")
        ) {
          totalMultiplier += multiplier?.Ranged?.aspd - 1;
        }
        return (enemy["stats"][stats][stat] / totalMultiplier).toFixed(2);

      default:
        return Math.round(
          enemy["stats"][stats][stat] *
            (multiplier?.["ALL"]?.[stat] ?? 1) *
            (multiplier?.[enemy.id]?.[stat] ?? 1) *
            (enemy.type.en.includes("Melee")
              ? multiplier?.Melee?.[stat] ?? 1
              : enemy.type.en.includes("Ranged")
              ? multiplier?.Ranged?.[stat] ?? 1
              : 1) +
            (multiplier?.["ALL"]?.[`fixed-${stat}`] ?? 0)
        );
    }
  };

  const parseSpecial = (enemy, param, stats, base_stat) => {
    if (!enemy.special.hasOwnProperty(param)) {
      return [];
    } else {
      if (param === "atk") {
        return enemy.special[param].map((skill) => {
          if (specialMods.hasOwnProperty(enemy.id)) {
            if (specialMods[enemy.id].hasOwnProperty(skill.name)) {
              return (
                <p>
                  <span className="text-rose-600">
                    {(
                      base_stat * specialMods[enemy.id][skill.name].multiplier +
                      specialMods[enemy.id][skill.name].fixedInc
                    ).toFixed(0)}
                  </span>
                  {` (${skill.type["jp"]})`}
                </p>
              );
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
          if (specialMods.hasOwnProperty(enemy.id)) {
            if (specialMods[enemy.id].hasOwnProperty(skill.name)) {
              return (
                <p className="text-rose-600">{`${(
                  base_stat * specialMods[enemy.id][skill.name].multiplier +
                  specialMods[enemy.id][skill.name].fixedInc
                ).toFixed(0)} (${skill.type["jp"]})`}</p>
              );
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
          {mapConfig.enemies.map(({ id, count, stats }, index) => {
            //get enemydata file
            //map through enemydata
            let enemy = require(`../enemy_data/${id}.json`);
            // console.log(enemy["stats"][stats]);
            return (
              <>
                <tr className={`${index % 2 === 1 ? "bg-neutral-100" : ""}`}>
                  {tableHeaders.map((stat) => {
                    return (
                      <td
                        className={`border border-gray-400 py-0 mx-2 min-w-[50px] max-w-[300px] ${textAlign(
                          stat
                        )} ${getMinWidth(stat)}  max-h-[75px] text-[1vw]`}
                        key={enemy.name + stat}
                      >
                        {stat === "enemy" ? (
                          <Image
                            src={`/enemy_icons/${id}.png`}
                            alt={enemy.name["jp"]}
                            height="75px"
                            width="75px"
                            className=""
                          />
                        ) : stat === "type" ? (
                          enemy["type"]["jp"].map((type) => <p>{type}</p>)
                        ) : stat === "atk" ? (
                          [
                            <p>{`${calculate(enemy, stats, stat)} ${
                              enemy.normal_attack.hits !== 1
                                ? `x ${enemy.normal_attack.hits}`
                                : ""
                            } (${enemy.normal_attack.type[`${"jp"}`]})`}</p>,
                          ].concat(
                            parseSpecial(
                              enemy,
                              stat,
                              stats,
                              calculate(enemy, stats, stat)
                            )
                          )
                        ) : stat === "weight" || stat === "mdef" ? (
                          +enemy["stats"][stats][stat] +
                          (multiplier?.["ALL"]?.[stat] ?? 0) +
                          (multiplier?.[id]?.[stat] ?? 0)
                        ) : stat === "aspd" ? (
                          calculate(enemy, stats, stat)
                        ) : stat === "remarks" ? (
                          getRemarks(enemy, specialMods)
                        ) : (
                          [
                            <p>
                              {Math.round(
                                enemy["stats"][stats][stat] *
                                  (multiplier?.["ALL"]?.[stat] ?? 1) *
                                  (multiplier?.[id]?.[stat] ?? 1) +
                                  (multiplier?.["ALL"]?.[`fixed-${stat}`] ?? 0)
                              )}
                            </p>,
                          ].concat(
                            parseSpecial(
                              enemy,
                              stat,
                              stats,
                              enemy["stats"][stats][stat] *
                                (multiplier?.["ALL"]?.[stat] ?? 1) *
                                (multiplier?.[id]?.[stat] ?? 1) +
                                (multiplier?.["ALL"]?.[`fixed-${stat}`] ?? 0)
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
