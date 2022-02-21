export const getRemarks = (enemy, specialMods, lang = "jp", type="simple") => {
  const parseHighlight = (text) => {
    const regexp = /\$/g;
    const array = [...text.matchAll(regexp)];
    console.log(array);
    return array[0].index === 0 ? (
      <p>
        <span className="text-rose-600 font-semibold">
          {text.slice(array[0].index + 1, array[1].index)}
        </span>
      </p>
    ) : (
      <p>
        {text.slice(0, array[0].index)}
        <span className="text-rose-600 font-semibold">
          {text.slice(array[0].index + 1, array[1].index)}
        </span>
        {text.slice(array[1].index + 1)}
      </p>
    );
  };

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
          remarksArr = remarksArr.concat(
            specialMods[enemy.id][skill.name].tooltip[lang]
          );
        } else {
          remarksArr = remarksArr.concat(skill.tooltip[type][lang]);
        }
      });
    });
    return remarksArr.map((line) => {
      return line.includes("$") ? parseHighlight(line) : <p>{line}</p>;
    });
  }

  return Object.keys(enemy.special).map((key) => {
    return enemy.special[key].map((skill) =>
      skill.tooltip[type][lang].map((line) => <p>{line}</p>)
    );
  });
};
