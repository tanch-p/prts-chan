import Image from "next/image";

export default function EnemySimple({ stageData }) {
  console.log(stageData);

  //return table of enemy data

  return (
    <>
      <table className="border">
        <thead>
          <tr>
            <th scope="col">enemy</th>
            <th scope="col">hp</th>
            <th scope="col">atk</th>
            <th scope="col">range</th>
            <th scope="col">def</th>
            <th scope="col">mdef</th>
            <th scope="col">aspd</th>
            <th scope="col">remarks</th>
          </tr>
        </thead>
        <tbody>
          {stageData.mapConfig.enemies.map(({ id, count }) => {
            //get enemydata file
            //map through enemydata
            let enemy = require(`../enemy_data/${id}.json`);
            // console.log(enemy);
            return (
              <>
                <tr>
                  <th scope="row">
                    <Image
                      src={`/enemy_icons/${id}.png`}
                      alt={stageData.name}
                      height="75px"
                      width="75px"
                    ></Image>
                  </th>
                  <th scope="row">{enemy.hp}</th>
                  <th scope="row">{enemy.atk}</th>
                  <th scope="row">{enemy.range}</th>
                  <th scope="row">{enemy.def}</th>
                  <th scope="row">{enemy.mdef}</th>
                  <th scope="row">{enemy.aspd}</th>
                  <th scope="row">{enemy.special}</th>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
