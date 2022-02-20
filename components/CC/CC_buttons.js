import { useState, useEffect, useContext } from "react";
import AppContext from "../AppContext";
import Daily_buttons from "./Daily_buttons";
import Perma_buttons from "./Perma_buttons";
import Selected_options from "./Selected_options";

export default function CC_buttons({
  mapConfig,
  setMultiplier,
  setSpecialMods,
}) {
  const { languageContext, device } = useContext(AppContext);
  const [language] = languageContext;

  let ccConfig = require(`../../cc_config/${mapConfig.config}.json`);
  const [selected, setSelected] = useState([{}]);
  const [totalRisk, setTotalRisk] = useState(0);

  useEffect(() => {
    const categoryArr = [];
    for (const category of ccConfig) {
      if (!categoryArr.includes(category.category)) {
        categoryArr.push(category.category);
      }
    }
    setSelected(
      categoryArr.map((ele) => {
        return {
          category: ele,
          selected: false,
          option: "",
          tooltip: "",
          target: "",
          effect: [],
        };
      })
    );
  }, []);

  const handleClick = (category, name, tooltip, target, effect, rank) => {
    //   console.log("name",name)
    //   console.log("category", category)
    //   console.log(selected)
    const categoryIndex = -1;
    for (let i = 0; i < selected.length; i++) {
      //check if button has been selected before
      if (selected[i].category === category) {
        categoryIndex = i;
      }
      if (selected[i].option === name) {
        setSelected(
          selected.map((item, index) => {
            if (index === i) {
              return {
                category: item.category,
                selected: false,
                option: "",
                target: "",
                tooltip: "",
                effect: [],
                rank: 0,
              };
            } else {
              return item;
            }
          })
        );
        return;
      }
    }
    // if button has not been selected before
    // console.log("here")
    setSelected(
      selected.map((item, index) => {
        if (index === categoryIndex) {
          return {
            category: item.category,
            selected: true,
            option: name,
            tooltip: tooltip,
            target: target,
            effect: effect,
            rank: rank,
          };
        } else {
          return item;
        }
      })
    );
  };

  const toggleOptionColor = (category, name) => {
    for (const item of selected) {
      if (item.category === category) {
        if (item.option === name) {
          return "bg-blue-500";
        } else if (item.selected) {
          return "bg-rose-600";
        } else {
          return "";
        }
      }
    }
  };

  const getRankColor = (rank) => {
    switch (rank) {
      case 1:
        return "bg-gray-500";
      case 2:
        return "bg-gray-800";
      case 3:
        return "bg-red-800";
    }
  };

  useEffect(() => {
    const multiplier = {
      ALL: { hp: 1, atk: 1, def: 1, mdef: 0, aspd: 1, ms: 1, weight: 0 },
    };
    const other_mods = {};
    for (const category of selected) {
      if (category.selected) {
        if (!multiplier[category.target]) {
          multiplier[category.target] = {
            hp: 1,
            atk: 1,
            def: 1,
            mdef: 0,
            aspd: 1,
            ms: 1,
            weight: 0,
          };
        }
        for (const effect in category.effect) {
          if (effect !== "special") {
            if (category.effect[effect][0] === "%") {
              multiplier[category.target][effect] +=
                parseInt(category.effect[effect].slice(1)) / 100;
            } else {
              multiplier[category.target][effect] = category.effect[effect];
            }
          } else {
            other_mods[category.target] = category.effect[effect];
          }
        }
      }
    }
    setSpecialMods(other_mods);
    setMultiplier(multiplier);
    setTotalRisk(selected.reduce((prev, curr) => prev + (curr.rank ?? 0), 0));
  }, [selected]);

  return (
    <>
      {mapConfig.ccType === "perma" ? (
        <Perma_buttons
          ccConfig={ccConfig}
          handleClick={handleClick}
          toggleOptionColor={toggleOptionColor}
          getRankColor={getRankColor}
          language={language}
        />
      ) : (
        <Daily_buttons
          ccConfig={ccConfig}
          handleClick={handleClick}
          toggleOptionColor={toggleOptionColor}
          getRankColor={getRankColor}
          language={language}
        />
      )}
      <Selected_options selected={selected} />
      <div className="flex flex-wrap border border-gray-800 w-full h-[50px] max-w-[900px]">
        <span>Clear</span>
        <span>Total Risk: {totalRisk}</span>
      </div>
    </>
  );
}
