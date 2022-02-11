import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import AppContext from "./AppContext";

export default function CC_buttons({ setMultiplier }) {
  const { languageContext, device } = useContext(AppContext);
  const [language] = languageContext;

  const rank = [1, 2, 3];
  let ccConfig = require("../cc_config/cc6-perma.json");
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
          }
        }
      }
    }
    setMultiplier(multiplier);
    setTotalRisk(selected.reduce((prev,curr) => prev+(curr.rank??0),0));
  }, [selected]);







  return (
    <>
      <div className="flex flex-wrap flex-col w-full h-[175px] max-w-[900px] overflow-x-scroll">
        {rank.map((num) => (
          <div
            className="border min-w-[50px] max-w-[60px] min-h-[50px] flex items-center"
            key={`rank${num}`}
          >
            <Image
              src={`/images/cc_buttons/rank${num}.png`}
              alt={`rank${num}`}
              width="65px"
              height="29px"
              className="overflow-hidden"
            />
          </div>
        ))}
        {ccConfig.map((category) =>
          category[`options`].map((option) => (
            <div
              className={`border w-[50px] h-[50px] ${getRankColor(
                option.rank
              )}`}
            >
              {Object.keys(option).includes("img") ? (
                <button
                  onClick={() =>
                    handleClick(
                      category.category,
                      option.img,
                      option.tooltip[language],
                      category.target,
                      option.effect,
                      option.rank
                    )
                  }
                >
                  <Image
                    src={`/images/cc_buttons/${option.img}.png`}
                    alt={`${option.tooltip_en}`}
                    width="50px"
                    height="50px"
                    className={`${toggleOptionColor(
                      category.category,
                      option.img
                    )}`}
                  />{" "}
                </button>
              ) : null}
            </div>
          ))
        )}
      </div>
      <div className="flex flex-wrap flex-col border border-gray-800 w-full h-[300px] max-w-[900px]">
        {selected.map((option) => (
          <p className="max-w-[400px]">{option.tooltip}</p>
        ))}
      </div>
      <div className="flex flex-wrap border border-gray-800 w-full h-[50px] max-w-[900px]">
        <span>Clear</span>
        <span>Total Risk: {totalRisk}</span>
      </div>

    </>
  );
}
