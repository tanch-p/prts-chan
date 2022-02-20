export const getRemarks = (enemy, specialMods, lang = "jp") => {
  let remarksArr = [];
  if (specialMods.hasOwnProperty(enemy.id)) {
    if (specialMods[enemy.id].hasOwnProperty("others")) {
      remarksArr = remarksArr.concat(
        specialMods[enemy.id].others.tooltip[lang]
      );
    }
    Object.keys(enemy.special).forEach((key) => {
      enemy.special[key].forEach((skill, index) => {
        if (specialMods[enemy.id].hasOwnProperty(skill.name)) {
          remarksArr = remarksArr.concat(
            specialMods[enemy.id][skill.name].tooltip[lang]
          );
        } else {
          remarksArr = remarksArr.concat(skill.tooltip[lang]);
        }
      });
    });
    return remarksArr.map((line) => <p>{line}</p>);
  }

  return Object.keys(enemy.special).map((key) => {
    return enemy.special[key].map((skill) =>
      skill.tooltip[lang].map((line) => <p>{line}</p>)
    );
  });
};
