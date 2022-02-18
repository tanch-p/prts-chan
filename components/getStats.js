export const getRemarks = (enemy, isCC, ccMods, lang = "jp") => {

    let remarksArr = [];
    if (isCC) {
      if (ccMods.hasOwnProperty(enemy.id)) {
        if (ccMods[enemy.id].hasOwnProperty("others")) {
          remarksArr = remarksArr.concat(ccMods[enemy.id].others.tooltip[lang]);
        }
        Object.keys(enemy.special).forEach((key) => {
          enemy.special[key].forEach((skill, index) => {
            if (ccMods[enemy.id].hasOwnProperty(skill.name)) {
              remarksArr = remarksArr.concat(ccMods[enemy.id][skill.name].tooltip[lang]);
            } else {
              remarksArr = remarksArr.concat(skill.tooltip[lang]);
            }
          });
        });
        return(remarksArr.map((line)=><p>{line}</p>))
      }
      
    }
  return Object.keys(enemy.special).map((key) => {
    return enemy.special[key].map((skill) =>
      skill.tooltip[lang].map((line) => <p>{line}</p>)
    );
  });
};
