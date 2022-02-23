const parseHighlight = (text, enemy) => {
  const regexp = /\$/g;
  const array = [...text.matchAll(regexp)];
  // console.log(array);
  const returnArr = [];
  let lastSliceIndex = 0;
  for (let i = 0; i < array.length; i += 2) {
    returnArr.push(<span>{text.slice(lastSliceIndex, array[i].index)}</span>);
    returnArr.push(
      <span className="text-rose-600 font-semibold">
        {text.slice(array[i].index + 1, array[i + 1].index)}
      </span>
    );
    i + 2 >= array.length
      ? returnArr.push(<span>{text.slice(array[i + 1].index + 1)}</span>)
      : (lastSliceIndex = array[i + 1].index + 1);
  }
  console.log("returnArr", returnArr);
  return <p>{returnArr}</p>;
};

const getTooltipMultiplier = (
  tooltip,
  originalMultiplier,
  specialMultiplier
) => {
  console.log(originalMultiplier);
  return tooltip.replace(
    "#mult",
    `${Math.round((originalMultiplier - 1 + specialMultiplier) * 100)}`
  );
};

export const getRemarks = (
  enemy,
  specialMods,
  stats,
  lang = "jp",
  type = "simple"
) => {
  let remarksArr = [];
  if (specialMods.hasOwnProperty(enemy.id)) {
    if (specialMods[enemy.id].hasOwnProperty("others")) {
      remarksArr = remarksArr.concat(
        specialMods[enemy.id].others.tooltip[lang]
      );
    }
    Object.keys(enemy.special).forEach((key) => {
      enemy.special[key].forEach((skill) => {
        if (specialMods[enemy.id].hasOwnProperty(skill.name)) {
          specialMods[enemy.id][skill.name].tooltip[lang].forEach((ele) => {
            if (ele.includes("#mult")) {
              remarksArr.push(
                getTooltipMultiplier(
                  ele,
                  skill.multiplier,
                  specialMods[enemy.id][skill.name].multiplier
                )
              );
            } else {
              remarksArr.push(ele);
            }
          });
        } else {
          remarksArr = remarksArr.concat(skill.tooltip[type][lang]);
        }
      });
    });
    // console.log(remarksArr);
    return remarksArr.map((line) => {
      return line.includes("$") ? parseHighlight(line, enemy) : <p>{line}</p>;
    });
  }

  return Object.keys(enemy.special).map((key) => {
    return enemy.special[key].map((skill) => {
      return enemy["stats"][stats][skill.name] !== undefined
        ? enemy["stats"][stats][skill.name].tooltip[type][lang].map((line) => (
            <p>{line}</p>
          ))
        : skill.tooltip[type][lang].map((line) => <p>{line}</p>);
    });
  });
};
